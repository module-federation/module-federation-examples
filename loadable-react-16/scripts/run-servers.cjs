#!/usr/bin/env node
const { spawn } = require('child_process');
const waitOn = require('wait-on');

const skipBuild = process.argv.includes('--skip-build');
const isWindows = process.platform === 'win32';
const longRunningProcesses = [];
let isShuttingDown = false;

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

function spawnPnpmProcess(args) {
  return spawn('pnpm', ['-w', ...args], {
    stdio: 'inherit',
    shell: isWindows,
  });
}

function runCommand(args, label) {
  return new Promise((resolve, reject) => {
    const command = spawnPnpmProcess(args);

    command.on('error', error => {
      reject(new Error(`${label} failed to start: ${error.message}`));
    });

    command.on('exit', code => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${label} exited with code ${code ?? 0}`));
    });
  });
}

function spawnServer(args, label) {
  const serverProcess = spawnPnpmProcess(args);

  longRunningProcesses.push(serverProcess);

  serverProcess.on('error', error => {
    console.error(`${label} failed: ${error.message}`);
    shutdown(1);
  });

  serverProcess.on('exit', code => {
    if (isShuttingDown) {
      return;
    }

    const exitCode = typeof code === 'number' ? code : 1;
    console.error(`${label} exited with code ${exitCode}`);
    shutdown(exitCode === 0 ? 0 : exitCode);
  });

  return serverProcess;
}

function waitForResources(resources) {
  return new Promise((resolve, reject) => {
    waitOn(
      {
        resources,
        interval: 200,
        timeout: 120_000,
        validateStatus: status => status >= 200 && status < 500,
      },
      error => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      },
    );
  });
}

function shutdown(code = 0) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  const terminationPromises = longRunningProcesses.map(child => {
    if (child.exitCode !== null || child.killed) {
      return Promise.resolve();
    }

    return new Promise(resolve => {
      child.once('exit', resolve);

      if (!child.killed) {
        child.kill('SIGTERM');
      }

      const forceKillTimeout = setTimeout(() => {
        if (child.exitCode === null && !child.killed) {
          child.kill('SIGKILL');
        }
        clearTimeout(forceKillTimeout);
      }, 5000);
    });
  });

  Promise.allSettled(terminationPromises).finally(() => {
    process.exit(code);
  });
}

async function main() {
  try {
    if (!skipBuild) {
      console.log('Building loadable-react-16 applications...');
      await runCommand(['--filter', 'loadable-react-16_*', 'build'], 'Build command');
      console.log('Build completed successfully.');
    }

    console.log('Starting loadable-react-16_app2 server...');
    spawnServer(['--filter', 'loadable-react-16_app2', 'serve'], 'loadable-react-16_app2 serve');

    console.log('Waiting for app2 remote assets to become available...');
    await waitForResources([
      'http-get://localhost:3001/server/remoteEntry.js',
      'http-get://localhost:3001/static/federation-stats.json',
    ]);
    console.log('App2 remote assets are available. Starting loadable-react-16_app1 server...');

    spawnServer(['--filter', 'loadable-react-16_app1', 'serve'], 'loadable-react-16_app1 serve');
  } catch (error) {
    console.error(error && error.message ? error.message : error);
    shutdown(1);
  }
}

main();
