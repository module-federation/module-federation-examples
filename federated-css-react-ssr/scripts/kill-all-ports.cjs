const { execSync } = require('node:child_process');

function killPorts(ports) {
  const unique = [...new Set(ports)];
  for (const port of unique) {
    try { execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' }); } catch {}
    try { execSync(`fuser -k ${port}/tcp`, { stdio: 'ignore' }); } catch {}
  }
}

(async () => {
  const exposePorts = [3001,3002,3003,3004,3005,3006,3007];
  const shellPorts = [4000,4001,4002,4003,4004,4005];
  const all = [...exposePorts, ...shellPorts];
  console.log('[kill-ports:ssr] killing', all.join(', '));
  killPorts(all);
})();

