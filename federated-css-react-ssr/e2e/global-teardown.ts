import { execSync } from 'node:child_process';

export default async function globalTeardown() {
  const ports = [3001,3002,3003,3004,3005,3006,3007, 4000,4001,4002,4003,4004,4005];
  for (const port of ports) {
    try { execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' }); } catch {}
    try { execSync(`fuser -k ${port}/tcp`, { stdio: 'ignore' }); } catch {}
  }
  await new Promise((r) => setTimeout(r, 200));
  const code = typeof process.exitCode === 'number' ? process.exitCode : 0;
  // eslint-disable-next-line no-process-exit
  process.exit(code);
}
