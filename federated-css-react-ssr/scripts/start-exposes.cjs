const { spawn } = require('node:child_process');
const path = require('node:path');
const waitOn = require('wait-on');
const kill = require('kill-port');
const { execSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const staticServer = path.join(root, 'scripts', 'serve-static.cjs');

function run(cmd, args, opts = {}) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true, ...opts });
}

async function killPort(port) {
  try {
    await kill(port, 'tcp');
  } catch (e) {
    // Port might not be in use, ignore
  }
}

const delay = ms => new Promise(r => setTimeout(r, ms));
function isPortInUse(port) {
  try {
    const out = execSync(`lsof -nPiTCP -sTCP:LISTEN | grep :${port}\\>`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
    return out.trim().length > 0;
  } catch {
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
      if (diag) console.log(`[exposes] port ${port} still in use -> ${diag}`);
    } catch {}
    await delay(500);
  }
}

async function exec(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = run(cmd, args, opts);
    p.on('exit', code => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} failed (${code})`))));
  });
}

async function main() {
  // Build and serve each expose sequentially, waiting for both server/client remoteEntry.js
  const exposes = [
    { dir: 'expose-css', port: 3001 },
    { dir: 'expose-jss', port: 3002 },
    { dir: 'expose-tailwind-css', port: 3003 },
    { dir: 'expose-scss', port: 3004 },
    { dir: 'expose-styled-component', port: 3005 },
    { dir: 'expose-css-module', port: 3006 },
    { dir: 'expose-less', port: 3007 },
  ];

  // Clean up all ports first with more aggressive approach
  console.log('[exposes] cleaning up ports...');
  for (const { port } of exposes) {
    await killPort(port);
    // Additional cleanup attempt
    try {
      await killPort(port);
    } catch (e) {
      // Ignore
    }
  }
  await new Promise(resolve => setTimeout(resolve, 3000));

  const procs = [];
  for (const { dir, port } of exposes) {
    const cwd = path.join('expose-apps', dir);
    console.log(`[exposes] building ${dir}...`);
    await exec('pnpm', ['-C', cwd, 'run', 'build']);
    // Sanity check: ensure remote entries exist
    const fs = require('node:fs');
    const serverRemote = path.join(cwd, 'dist', 'server', 'remoteEntry.js');
    const clientRemote = path.join(cwd, 'dist', 'client', 'remoteEntry.js');
    if (!fs.existsSync(serverRemote)) {
      console.warn(`[exposes] WARN: missing ${serverRemote}`);
    }
    if (!fs.existsSync(clientRemote)) {
      console.warn(`[exposes] WARN: missing ${clientRemote}`);
    }
    console.log(`[exposes] ensuring port ${port} is free for ${dir}...`);
    await ensurePortFree(port, 20000);
    console.log(`[exposes] serving ${dir} on ${port}...`);
    const p = run('node', [staticServer, '--dir', path.join(root, cwd, 'dist'), '--port', String(port)]);
    procs.push(p);
    await waitOn({
      resources: [
        `http://localhost:${port}/server/remoteEntry.js`,
        `http://localhost:${port}/client/remoteEntry.js`,
      ],
      timeout: 480000,
      validateStatus: s => s >= 200 && s < 400,
    });
    console.log(`[exposes] ${dir} ready on ${port}.`);
  }

  const killAll = sig => procs.forEach(pr => pr.kill(sig));
  process.on('SIGINT', () => killAll('SIGINT'));
  process.on('SIGTERM', () => killAll('SIGTERM'));

  // keep process alive
  await new Promise(() => {});
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
