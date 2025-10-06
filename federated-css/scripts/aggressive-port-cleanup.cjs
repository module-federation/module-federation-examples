const { execSync } = require('node:child_process');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function normalizePorts(ports) {
  const list = Array.isArray(ports) ? ports : [ports];
  return [...new Set(list.map(Number).filter(port => Number.isFinite(port) && port > 0))];
}

function killWithLsof(ports) {
  if (process.platform === 'win32') return false;
  const args = ports.map(port => `-ti:${port}`).join(' ');
  if (!args) return false;
  try {
    const stdout = execSync(`lsof ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    if (!stdout) return false;
    const pids = [...new Set(stdout.split(/\s+/).filter(Boolean))];
    if (pids.length === 0) return false;
    execSync(`kill -9 ${pids.join(' ')}`, { stdio: 'ignore' });
    return true;
  } catch (err) {
    // lsof exits with code 1 if nothing is found – treat as success (port already free)
    if (err.status === 1 || err.code === 1) {
      return false;
    }
    throw err;
  }
}

function killWithFuser(ports) {
  if (process.platform !== 'linux') return false;
  const args = ports.map(port => `${port}/tcp`).join(' ');
  if (!args) return false;
  try {
    execSync(`fuser -k ${args}`, { stdio: 'ignore' });
    return true;
  } catch (err) {
    // Exit code 1 means no processes to kill – ignore.
    if (err.status === 1 || err.code === 1) {
      return false;
    }
    throw err;
  }
}

async function aggressiveKillPorts(ports) {
  const list = normalizePorts(ports);
  if (list.length === 0) return;

  console.log(`[aggressive-cleanup] Killing ports ${list.join(', ')}...`);

  // Run both strategies to maximise compatibility.
  try {
    killWithLsof(list);
  } catch (err) {
    console.warn(`[aggressive-cleanup] lsof kill failed: ${err.message}`);
  }

  try {
    killWithFuser(list);
  } catch (err) {
    console.warn(`[aggressive-cleanup] fuser kill failed: ${err.message}`);
  }
}

async function aggressiveKillPort(port) {
  await aggressiveKillPorts([port]);
}

async function cleanupAllPorts() {
  const reactConsumerPorts = [3001, 3002, 3003, 3004, 3005, 3006, 3007];
  const exposePorts = [4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007];
  const nextConsumerPorts = [8081, 8082, 8083, 8184];

  const allPorts = [...reactConsumerPorts, ...exposePorts, ...nextConsumerPorts];

  console.log('[aggressive-cleanup] Starting aggressive port cleanup...');
  for (let attempt = 1; attempt <= 3; attempt++) {
    console.log(`[aggressive-cleanup] Attempt ${attempt}...`);
    await aggressiveKillPorts(allPorts);
    if (attempt < 3) {
      await sleep(1000 * attempt);
    }
  }
  console.log('[aggressive-cleanup] All ports aggressively cleaned.');
}

if (require.main === module) {
  cleanupAllPorts().catch(err => {
    console.error('[aggressive-cleanup] Error:', err);
    process.exit(1);
  });
}

module.exports = { aggressiveKillPort, aggressiveKillPorts, cleanupAllPorts };
