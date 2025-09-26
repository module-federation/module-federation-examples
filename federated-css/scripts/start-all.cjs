const { spawn } = require('node:child_process');
const waitOn = require('wait-on');
const path = require('node:path');
const fs = require('node:fs');
const { aggressiveKillPort, aggressiveKillPorts } = require('./aggressive-port-cleanup.cjs');

const WAIT_TIMEOUT = 480000;
const isReadyStatus = status => status >= 200 && status < 400;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const { execSync } = require('node:child_process');

function isPortInUse(port) {
  try {
    const out = execSync(`lsof -nPiTCP -sTCP:LISTEN | grep :${port}\\>`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
    return out.trim().length > 0;
  } catch {
    // grep exits non-zero if not found
    return false;
  }
}

function forceKillPort(port) {
  try { execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' }); } catch {}
  try { execSync(`fuser -k ${port}/tcp`, { stdio: 'ignore' }); } catch {}
}

async function ensurePortFree(port, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (!isPortInUse(port)) return;
    forceKillPort(port);
    try {
      const diag = execSync(`ss -ltnp | grep :${port} || true`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
      if (diag) {
        console.log(`[federated-css] port ${port} still in use -> ${diag}`);
      }
    } catch {}
    await delay(500);
  }
}

const root = path.resolve(__dirname, '..');

// Ensure v8 compile cache writes go to a local ignored folder instead of polluting
// sibling workspaces (corepack/pnpm relies on this cache under the hood).
const v8CacheDir = path.join(root, '.cache', 'v8-compile-cache');
fs.mkdirSync(v8CacheDir, { recursive: true });
process.env.V8_COMPILE_CACHE_CACHE_DIR = v8CacheDir;

function run(cmd, args) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true });
}

async function waitForReady(proc, resources, label, timeout = WAIT_TIMEOUT) {
  let ready = false;
  let exitHandler;
  const waitPromise = waitOn({ resources, timeout, validateStatus: isReadyStatus }).then(() => {
    ready = true;
  });

  const exitPromise = new Promise((_, reject) => {
    exitHandler = code => {
      if (!ready) {
        const message = `${label} exited before becoming ready (code ${code ?? 'unknown'})`;
        reject(new Error(message));
      }
    };
    proc.once('exit', exitHandler);
  });

  try {
    await Promise.race([waitPromise, exitPromise]);
    if (!ready) {
      await waitPromise.catch(() => {});
      throw new Error(`${label} did not report ready`);
    }
  } finally {
    if (exitHandler) {
      proc.removeListener('exit', exitHandler);
    }
  }
}

async function ensureExit(proc) {
  if (proc.exitCode != null || proc.signalCode != null) return;
  await new Promise(resolve => proc.once('exit', resolve));
}

async function main() {
  const reactConsumers = [
    { dir: 'combination-of-4', port: 3001, serve: true },
    { dir: 'combination-of-5', port: 3002, serve: true },
    { dir: 'css-and-styled-component', port: 3003 },
    { dir: 'css-module-and-jss', port: 3004 },
    { dir: 'less-and-scss', port: 3005 },
    { dir: 'tailwind-global-and-less', port: 3006 },
    { dir: 'tailwind-module-and-jss', port: 3007 },
  ];

  const exposes = [4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007];

  const nextConsumers = [
    { dir: 'jss-css-and-tailwind-module', port: 8083 },
    { dir: 'jss-and-tailwind-global', port: 8082 },
    { dir: 'less-and-styled-component', port: 8084 },
    { dir: 'combination-of-4', port: 8081 },
  ];

  const procs = [];

  const removeProc = proc => {
    const index = procs.indexOf(proc);
    if (index !== -1) {
      procs.splice(index, 1);
    }
  };

  // Kill all potentially conflicting ports first using aggressive cleanup
  console.log('[federated-css] cleaning up ports aggressively...');
  const allPorts = [...reactConsumers.map(c => c.port), ...exposes, ...nextConsumers.map(c => c.port)];
  
  // Use aggressive cleanup for all ports
  await aggressiveKillPorts(allPorts);
  
  // Give OS time to fully release ports
  await delay(3000);

  console.log('[federated-css] starting consumers-react (sequential servers)...');
  for (const { dir, port, serve } of reactConsumers) {
    const cwd = path.join('consumers-react', dir);

    // Build and serve static for ALL react consumers to avoid multiple dev servers
    console.log(`[federated-css] building consumers-react ${dir} for static serve...`);
    await new Promise((res, rej) => {
      const buildProc = run('pnpm', ['-C', cwd, 'run', 'build']);
      buildProc.on('exit', code => (code === 0 ? res() : rej(new Error(`build ${dir} failed`))));
    });
    console.log(`[federated-css] ensuring port ${port} is free for consumers-react ${dir}...`);
    await ensurePortFree(port, 20000);
    const serveProc = run('pnpm', ['-C', cwd, 'run', 'serve']);
    procs.push(serveProc);

    await waitForReady(procs[procs.length - 1], [`http://localhost:${port}`], `consumers-react ${dir}`);
    console.log(`[federated-css] consumers-react ${dir} up at ${port}`);
  }

  console.log('[federated-css] building expose apps (sequential)...');
  for (const port of exposes) {
    const dirMap = {
      4000: 'expose-css',
      4001: 'expose-css-module',
      4002: 'expose-jss',
      4003: 'expose-less',
      4004: 'expose-scss',
      4005: 'expose-styled-component',
      4006: 'expose-tailwind-css-global',
      4007: 'expose-tailwind-css-module',
    };
    const dir = dirMap[port];
    if (!dir) continue;
    const cwd = path.join('expose-remotes', dir);
    await new Promise((res, rej) => {
      const p = run('pnpm', ['-C', cwd, 'run', 'build']);
      p.on('exit', c => (c === 0 ? res() : rej(new Error(`build ${dir} failed`))));
    });
  }

  console.log('[federated-css] serving expose apps (sequential)...');
  for (const port of exposes) {
    const dirMap = {
      4000: 'expose-css',
      4001: 'expose-css-module',
      4002: 'expose-jss',
      4003: 'expose-less',
      4004: 'expose-scss',
      4005: 'expose-styled-component',
      4006: 'expose-tailwind-css-global',
      4007: 'expose-tailwind-css-module',
    };
    const dir = dirMap[port];
    if (!dir) continue;
    const cwd = path.join('expose-remotes', dir);
    console.log(`[federated-css] ensuring port ${port} is free for expose ${dir}...`);
    await ensurePortFree(port, 20000);
    const p = run('pnpm', ['-C', cwd, 'run', 'serve']);
    procs.push(p);
    const exposeResources = [
      `http://localhost:${port}`,
      `http://localhost:${port}/remoteEntry.js`,
    ];
    await waitForReady(procs[procs.length - 1], exposeResources, `expose ${dir}`);
    console.log(`[federated-css] expose ${dir} up at ${port}`);
  }

  console.log('[federated-css] starting Next consumers (sequential production servers)...');
  for (const { dir, port } of nextConsumers) {
    const cwd = path.join('consumers-nextjs', dir);
    const label = `next ${dir}`;
    let lastError;
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`[federated-css] preparing ${label} on port ${port} (attempt ${attempt}/${maxAttempts})...`);
      await aggressiveKillPort(port);
      await delay(1500 * attempt);

      if (attempt === 1) {
        console.log(`[federated-css] building ${label} for production...`);
        await new Promise((resolve, reject) => {
          const buildProc = run('pnpm', ['-C', cwd, 'run', 'build']);
          buildProc.on('exit', code => (code === 0 ? resolve() : reject(new Error(`${label} build failed (code ${code})`))));
        });
      }

      console.log(`[federated-css] ensuring port ${port} is free for ${label}...`);
      await ensurePortFree(port, 20000);
      console.log(`[federated-css] starting ${label} with next start...`);
      const proc = run('pnpm', ['-C', cwd, 'exec', 'next', 'start', '-H', '127.0.0.1', '-p', String(port)]);
      procs.push(proc);

      try {
        await waitForReady(proc, [`http://localhost:${port}`], `${label} (port ${port})`);
        console.log(`[federated-css] ${label} up at ${port}`);
        break;
      } catch (error) {
        lastError = error;
        console.warn(`[federated-css] ${label} failed to start: ${error.message}`);
        removeProc(proc);
        try {
          proc.kill('SIGTERM');
        } catch (killError) {
          if (killError && killError.code !== 'ESRCH') {
            console.warn(`[federated-css] failed to kill ${label}: ${killError.message}`);
          }
        }
        await ensureExit(proc);
        // Make absolutely sure the port is free before retrying
        console.log(`[federated-css] clearing port ${port} before retrying ${label}...`);
        await ensurePortFree(port, 20000);
        await delay(1500 * attempt);

        if (attempt === maxAttempts) {
          throw lastError;
        }
      }
    }
  }

  console.log('[federated-css] all ports are up.');

  const killAll = sig => { procs.forEach(pr => pr.kill(sig)); };
  process.on('SIGINT', () => killAll('SIGINT'));
  process.on('SIGTERM', () => killAll('SIGTERM'));

  await new Promise(() => {});
}

main().catch(err => { console.error(err); process.exit(1); });
