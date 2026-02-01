const { spawn } = require('node:child_process');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const waitOn = require('wait-on');

const processes = new Set();
let shuttingDown = false;

function ensureServerBundle(appDirName) {
  const serverEntry = path.join(__dirname, '..', appDirName, 'dist', 'server', 'main.js');
  if (fs.existsSync(serverEntry)) {
    return;
  }

  console.warn(`[serve] Missing ${appDirName}/dist/server/main.js; rebuilding server bundle...`);
  const res = spawnSync('pnpm', ['--filter', `loadable-react-18_${appDirName}`, 'build:server'], {
    stdio: 'inherit',
  });
  if (res.status !== 0) {
    console.error(`[serve] Failed to rebuild ${appDirName} server bundle (exit ${res.status ?? 'unknown'})`);
    shutdown(res.status || 1);
  }

  if (!fs.existsSync(serverEntry)) {
    console.error(`[serve] Still missing server entry after rebuild: ${serverEntry}`);
    shutdown(1);
  }
}

function spawnProcess(command, args, name) {
  const child = spawn(command, args, {
    stdio: 'inherit',
  });

  processes.add(child);

  child.on('exit', (code, signal) => {
    processes.delete(child);

    if (shuttingDown) {
      return;
    }

    const exitCode = typeof code === 'number' ? code : 1;
    console.error(`${name} exited with code ${exitCode}${signal ? ` (signal: ${signal})` : ''}`);
    shutdown(exitCode || 1);
  });

  child.on('error', error => {
    if (shuttingDown) {
      return;
    }

    console.error(`${name} failed to start`, error);
    shutdown(1);
  });

  return child;
}

function shutdown(code = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of processes) {
    if (!child.killed) {
      child.kill('SIGINT');
    }
  }

  process.exit(code);
}

['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => {
  process.on(signal, () => shutdown(0));
});

console.log('Starting App2 (serve)...');
ensureServerBundle('app2');
spawnProcess('pnpm', ['--filter', 'loadable-react-18_app2', 'serve'], 'App2');

waitOn({
  resources: ['http://localhost:3001/server/remoteEntry.js'],
  timeout: 180_000,
})
  .then(() => {
    if (shuttingDown) {
      return;
    }

    console.log('App2 is ready. Starting App1 (serve)...');
    ensureServerBundle('app1');
    spawnProcess('pnpm', ['--filter', 'loadable-react-18_app1', 'serve'], 'App1');
  })
  .catch(error => {
    console.error('Failed to detect App2 readiness', error);
    shutdown(1);
  });
