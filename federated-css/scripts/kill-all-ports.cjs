const { execSync, spawn } = require('node:child_process');
const path = require('node:path');
const { cleanupAllPorts } = require('./aggressive-port-cleanup.cjs');

const reactConsumerPorts = [3001, 3002, 3003, 3004, 3005, 3006, 3007];
const exposePorts = [4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007];
const nextConsumerPorts = [8081, 8082, 8083, 8084];

const ports = [...new Set([...reactConsumerPorts, ...exposePorts, ...nextConsumerPorts])];

function detectUsedPorts(portList) {
  const result = new Set();
  if (process.platform === 'win32') {
    return portList.map(String);
  }

  try {
    const stdout = execSync('lsof -nPiTCP -sTCP:LISTEN', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const candidates = new Set(portList);
    for (const line of stdout.split('\n')) {
      const match = line.match(/:(\d+)\s+\(LISTEN\)/);
      if (!match) continue;
      const port = Number(match[1]);
      if (candidates.has(port)) {
        result.add(String(port));
      }
    }
  } catch (err) {
    if (!(err.status === 1 || err.code === 1)) {
      console.warn(`[kill-all-ports] Unable to scan ports via lsof: ${err.message}`);
    }
  }

  return [...result];
}

async function runKillPortOnce(portList) {
  if (portList.length === 0) return;

  const cliPath = require.resolve('kill-port/cli.js');
  console.log(`[kill-all-ports] Killing ports with single kill-port command: ${portList.join(', ')}`);

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cliPath, ...portList], {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
    });

    child.on('error', reject);
    child.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`kill-port exited with code ${code}`));
      }
    });
  });
}

(async () => {
  try {
    const usedPorts = detectUsedPorts(ports);
    if (usedPorts.length) {
      await runKillPortOnce(usedPorts);
    } else {
      console.log('[kill-all-ports] No active processes detected on target ports.');
    }
  } catch (err) {
    console.warn(`[kill-all-ports] kill-port failed (${err.message}). Falling back to aggressive cleanup.`);
  }
  await cleanupAllPorts();
})().catch(err => {
  console.error('[kill-all-ports] Error:', err);
  process.exit(1);
});
