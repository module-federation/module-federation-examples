const { spawn } = require('node:child_process');
const waitOn = require('wait-on');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function run(cmd, args) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true });
}

async function main() {
  await new Promise((res, rej) => {
    const p = run('pnpm', ['--filter', '"vue2-in-vue3_vue*"', '-r', 'run', 'build']);
    p.on('exit', c => (c === 0 ? res() : rej(new Error('build failed'))));
  });
  const pServe = run('pnpm', ['--filter', '"vue2-in-vue3_vue*"', '-r', 'run', 'serve']);
  await waitOn({ resources: ['http://localhost:3001', 'http://localhost:3002'], timeout: 180000 });
  process.on('SIGINT', () => pServe.kill('SIGINT'));
  process.on('SIGTERM', () => pServe.kill('SIGTERM'));
  await new Promise(() => {});
}

main().catch(err => { console.error(err); process.exit(1); });

