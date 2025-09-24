const { spawn, execSync } = require('node:child_process');
const waitOn = require('wait-on');
const path = require('node:path');
const fs = require('node:fs');

const root = path.resolve(__dirname, '..');

// Ensure v8 compile cache writes go to a local ignored folder instead of polluting
// sibling workspaces (corepack/pnpm relies on this cache under the hood).
const v8CacheDir = path.join(root, '.cache', 'v8-compile-cache');
fs.mkdirSync(v8CacheDir, { recursive: true });
process.env.V8_COMPILE_CACHE_CACHE_DIR = v8CacheDir;

function run(cmd, args) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true });
}

function killPort(port) {
  try {
    // Kill any process on the port (macOS/Linux compatible)
    const pids = execSync(`lsof -ti tcp:${port} 2>/dev/null || true`, { encoding: 'utf8' }).trim();
    if (pids) {
      execSync(`kill -9 ${pids} 2>/dev/null || true`, { stdio: 'ignore' });
    }
  } catch (e) {
    // Ignore errors, port might not be in use
  }
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

  // Kill all potentially conflicting ports first
  console.log('[federated-css] cleaning up ports...');
  [...reactConsumers.map(c => c.port), ...exposes, ...nextConsumers.map(c => c.port)].forEach(killPort);

  console.log('[federated-css] starting consumers-react (sequential servers)...');
  for (const { dir, port, serve } of reactConsumers) {
    const cwd = path.join('consumers-react', dir);

    if (serve) {
      console.log(`[federated-css] building consumers-react ${dir} for static serve...`);
      await new Promise((res, rej) => {
        const buildProc = run('pnpm', ['-C', cwd, 'run', 'build']);
        buildProc.on('exit', code => (code === 0 ? res() : rej(new Error(`build ${dir} failed`))));
      });
      const serveProc = run('pnpm', ['-C', cwd, 'run', 'serve']);
      procs.push(serveProc);
    } else {
      const devProc = run('pnpm', ['-C', cwd, 'run', 'start']);
      procs.push(devProc);
    }

    await waitOn({ resources: [`http://localhost:${port}`], timeout: 480000, validateStatus: s => s >= 200 && s < 500 });
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
    const p = run('pnpm', ['-C', cwd, 'run', 'serve']);
    procs.push(p);
    await waitOn({ resources: [`http://localhost:${port}`], timeout: 480000, validateStatus: s => s >= 200 && s < 500 });
    console.log(`[federated-css] expose ${dir} up at ${port}`);
  }

  console.log('[federated-css] starting Next consumers (sequential dev servers)...');
  for (const { dir, port } of nextConsumers) {
    // Extra cleanup for each Next.js port in case previous one didn't clean up properly
    killPort(port);
    const cwd = path.join('consumers-nextjs', dir);
    const p = run('pnpm', ['-C', cwd, 'run', 'start']);
    procs.push(p);
    await waitOn({ resources: [`http://localhost:${port}`], timeout: 480000, validateStatus: s => s >= 200 && s < 500 });
    console.log(`[federated-css] next ${dir} up at ${port}`);
  }

  console.log('[federated-css] all ports are up.');

  const killAll = sig => { procs.forEach(pr => pr.kill(sig)); };
  process.on('SIGINT', () => killAll('SIGINT'));
  process.on('SIGTERM', () => killAll('SIGTERM'));

  await new Promise(() => {});
}

main().catch(err => { console.error(err); process.exit(1); });
