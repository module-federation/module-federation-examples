const { spawn } = require('node:child_process');
const process = require('node:process');
const waitOn = require('wait-on');
const path = require('node:path');
const fs = require('node:fs');

const processes = new Set();
let shuttingDown = false;

const args = process.argv.slice(2);
const skipBuild = args.includes('--skip-build') || process.env.SKIP_BUILD === '1' || process.env.SKIP_BUILD === 'true';

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

    if (exitCode === 0 && !signal) {
      console.error(`${name} exited unexpectedly.`);
      shutdown(1);
    } else {
      console.error(`${name} exited with code ${exitCode}${signal ? ` (signal: ${signal})` : ''}`);
      shutdown(exitCode || 1);
    }
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

console.log('Starting App2...');
if (skipBuild) {
  const app2Main = path.resolve(__dirname, '..', 'app2', 'dist', 'server', 'main.js');
  if (!fs.existsSync(app2Main)) {
    console.error(`[start] SKIP_BUILD is enabled but missing ${app2Main}. Run \`pnpm --filter loadable-react-18_app2 build\` first.`);
    shutdown(1);
  }
  spawnProcess('pnpm', ['--filter', 'loadable-react-18_app2', 'serve'], 'App2');
} else {
  spawnProcess('pnpm', ['--filter', 'loadable-react-18_app2', 'start'], 'App2');
}

waitOn({
  resources: ['http://localhost:3001/server/remoteEntry.js'],
  timeout: 180_000,
})
  .then(() => {
    if (shuttingDown) {
      return;
    }

    console.log('App2 is ready. Starting App1...');
    if (skipBuild) {
      const app1Main = path.resolve(__dirname, '..', 'app1', 'dist', 'server', 'main.js');
      if (!fs.existsSync(app1Main)) {
        console.error(`[start] SKIP_BUILD is enabled but missing ${app1Main}. Run \`pnpm --filter loadable-react-18_app1 build\` first.`);
        shutdown(1);
      }
      spawnProcess('pnpm', ['--filter', 'loadable-react-18_app1', 'serve'], 'App1');
    } else {
      spawnProcess('pnpm', ['--filter', 'loadable-react-18_app1', 'start'], 'App1');
    }
  })
  .catch(error => {
    console.error('Failed to detect App2 readiness', error);
    shutdown(1);
  });
