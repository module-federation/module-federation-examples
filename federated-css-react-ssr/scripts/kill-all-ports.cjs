const kill = require('kill-port');

async function killAllPorts() {
  const exposePorts = [3001, 3002, 3003, 3004, 3005, 3006, 3007];
  const shellPorts = [4000, 4001, 4002, 4003, 4004, 4005];
  
  const allPorts = [...exposePorts, ...shellPorts];
  
  console.log('[kill-all-ports] Killing all ports...');
  
  for (const port of allPorts) {
    try {
      await kill(port, 'tcp');
      console.log(`[kill-all-ports] Killed port ${port}`);
    } catch (e) {
      // Port might not be in use, ignore
    }
  }
  
  console.log('[kill-all-ports] All ports killed.');
}

killAllPorts().catch(err => {
  console.error('[kill-all-ports] Error:', err);
  process.exit(1);
});