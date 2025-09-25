const { cleanupAllPorts } = require('./aggressive-port-cleanup.cjs');

// Just delegate to the aggressive cleanup
cleanupAllPorts().catch(err => {
  console.error('[kill-all-ports] Error:', err);
  process.exit(1);
});