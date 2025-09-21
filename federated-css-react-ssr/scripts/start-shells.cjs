const { spawn } = require('node:child_process');
const path = require('node:path');
const waitOn = require('wait-on');

const root = path.resolve(__dirname, '..');

function run(cmd, args, opts = {}) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true, ...opts });
}

async function main() {
  // build all shells, then serve all, and wait for ports
  await new Promise((resolve, reject) => {
    const p = run('pnpm', ['--filter', '"federated-css-react-ssr_shell*"', '-r', 'run', 'build']);
    p.on('exit', code => (code === 0 ? resolve() : reject(new Error('build shells failed'))));
  });
  const pServe = run('pnpm', ['--filter', '"federated-css-react-ssr_shell*"', '-r', 'run', 'serve']);

  await waitOn({
    resources: [
      'http://localhost:4000',
      'http://localhost:4001',
      'http://localhost:4002',
      'http://localhost:4003',
      'http://localhost:4004',
      'http://localhost:4005',
    ],
    timeout: 300000,
    validateStatus: s => s >= 200 && s < 500,
  });

  process.on('SIGINT', () => pServe.kill('SIGINT'));
  process.on('SIGTERM', () => pServe.kill('SIGTERM'));
  // keep process alive
  await new Promise(() => {});
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
