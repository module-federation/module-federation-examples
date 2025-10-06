const { spawn } = require('node:child_process');
const waitOn = require('wait-on');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function run(cmd, args) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true });
}

async function main() {
  // Use dev servers to reduce CPU/IO load in CI
  console.log('[vue2-in-vue3] starting dev servers for vue2 and vue3...');
  const pStart = run('pnpm', ['--filter', '"vue2-in-vue3_vue*"', '-r', 'run', 'start']);

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
