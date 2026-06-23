const { spawn } = require('node:child_process');
const waitOn = require('wait-on');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..', '..');
const pnpmCmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

function run(cmd, args) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: repoRoot });
}

async function main() {
  // Use dev servers to reduce CPU/IO load in CI
  console.log('[vue2-in-vue3] starting dev servers for vue2 and vue3...');
  const pStart = run(pnpmCmd, ['--filter', 'vue2-in-vue3_vue*', '-r', 'run', 'start']);

  pStart.once('error', err => {
    console.error('[vue2-in-vue3] failed to start dev servers:', err);
    process.exit(1);
  });
  pStart.once('exit', (code, signal) => {
    console.error(`[vue2-in-vue3] pnpm start exited (code=${code}, signal=${signal})`);
    process.exit(typeof code === 'number' ? code : 1);
  });

  await waitOn({
    resources: ['http://localhost:3001', 'http://localhost:3002'],
    timeout: 300000,
    validateStatus: s => s >= 200 && s < 500,
  });
  console.log('[vue2-in-vue3] ports 3001 and 3002 are up.');

  process.on('SIGINT', () => pStart.kill('SIGINT'));
  process.on('SIGTERM', () => pStart.kill('SIGTERM'));
  await new Promise(() => {});
}

main().catch(err => { console.error(err); process.exit(1); });
