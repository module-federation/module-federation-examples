import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

export default async function globalTeardown() {
  try {
    const killer = resolve(__dirname, '../scripts/kill-all-ports.cjs');
    execFileSync(process.execPath, [killer], { stdio: 'inherit' });
  } catch (e) {
    // ignore
  }
  await new Promise(r => setTimeout(r, 200));
  const code = typeof process.exitCode === 'number' ? process.exitCode : 0;
  // eslint-disable-next-line no-process-exit
  process.exit(code);
}
