import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

async function killAll() {
  const killer = resolve(__dirname, '../scripts/kill-all-ports.cjs');
  execFileSync(process.execPath, [killer], { stdio: 'inherit' });
}

export default async function globalSetup() {
  try {
    await killAll();
  } catch (e) {
    // ignore; CI will retry inside start scripts
  }
}
