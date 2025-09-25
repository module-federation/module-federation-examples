const { execSync } = require('child_process');
const kill = require('kill-port');

async function aggressiveKillPort(port) {
  console.log(`[aggressive-cleanup] Killing port ${port}...`);
  
  // Try kill-port first
  try {
    await kill(port, 'tcp');
  } catch (e) {
    // Ignore
  }
  
  // Also try system commands
  try {
    if (process.platform === 'darwin' || process.platform === 'linux') {
      // Find and kill process using lsof
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' });
    }
  } catch (e) {
    // Ignore if no process found
  }
  
  // Final attempt with fuser (Linux)
  try {
    if (process.platform === 'linux') {
      execSync(`fuser -k ${port}/tcp`, { stdio: 'ignore' });
    }
  } catch (e) {
    // Ignore
  }
}

async function cleanupAllPorts() {
  const reactConsumerPorts = [3001, 3002, 3003, 3004, 3005, 3006, 3007];
  const exposePorts = [4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007];
  const nextConsumerPorts = [8081, 8082, 8083, 8084];
  
  const allPorts = [...reactConsumerPorts, ...exposePorts, ...nextConsumerPorts];
  
  console.log('[aggressive-cleanup] Starting aggressive port cleanup...');
  
  // Kill all ports multiple times with delays
  for (let attempt = 1; attempt <= 3; attempt++) {
    console.log(`[aggressive-cleanup] Attempt ${attempt}...`);
    for (const port of allPorts) {
      await aggressiveKillPort(port);
    }
    if (attempt < 3) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('[aggressive-cleanup] All ports aggressively cleaned.');
}

// Run if called directly
if (require.main === module) {
  cleanupAllPorts().catch(err => {
    console.error('[aggressive-cleanup] Error:', err);
    process.exit(1);
  });
}

module.exports = { aggressiveKillPort, cleanupAllPorts };