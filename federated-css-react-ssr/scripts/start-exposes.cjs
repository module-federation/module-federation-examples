const { spawn } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function run(cmd, args, opts = {}) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true, ...opts });
}

async function main() {
  // build all exposes, then serve all
  await new Promise((resolve, reject) => {
    const p = run('pnpm', ['--filter', '"federated-css-react-ssr_expose-*"', '-r', 'run', 'build']);
    p.on('exit', code => (code === 0 ? resolve() : reject(new Error('build exposes failed'))));
  });
  const pServe = run('pnpm', ['--filter', '"federated-css-react-ssr_expose-*"', '-r', 'run', 'serve']);
  process.on('SIGINT', () => pServe.kill('SIGINT'));
  process.on('SIGTERM', () => pServe.kill('SIGTERM'));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

