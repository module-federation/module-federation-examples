import { execSync } from 'node:child_process';

function killPorts(ports: number[]) {
  const unique = Array.from(new Set(ports));
  for (const port of unique) {
    try {
      // macOS/Linux via lsof; ignore if nothing found
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' });
    } catch {}
    try {
      // Linux alternative via fuser
      execSync(`fuser -k ${port}/tcp`, { stdio: 'ignore' });
    } catch {}
  }
}

export default async function globalSetup() {
  // SSR uses exposes on 3001-3007 and shells on 4000-4005
  const ports = [3001,3002,3003,3004,3005,3006,3007, 4000,4001,4002,4003,4004,4005];
  try {
    killPorts(ports);
  } catch {}
}

