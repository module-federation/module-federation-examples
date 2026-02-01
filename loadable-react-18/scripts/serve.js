const { spawn } = require('node:child_process');
const process = require('node:process');
const waitOn = require('wait-on');

const processes = new Set();
let shuttingDown = false;

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
    spawnProcess('pnpm', ['--filter', 'loadable-react-18_app1', 'serve'], 'App1');
  })
  .catch(error => {
    console.error('Failed to detect App2 readiness', error);
    shutdown(1);
  });
