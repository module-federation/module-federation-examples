const { spawn } = require('node:child_process');
const path = require('node:path');
const waitOn = require('wait-on');

const root = path.resolve(__dirname, '..');

function run(cmd, args, opts = {}) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true, ...opts });
}

async function main() {
  // build all exposes, then serve all
  console.log('[exposes] building all expose apps...');
  await new Promise((resolve, reject) => {
    const p = run('pnpm', ['--filter', '"federated-css-react-ssr_expose-*"', '-r', 'run', 'build']);
    p.on('exit', code => (code === 0 ? resolve() : reject(new Error('build exposes failed'))));
  });
  console.log('[exposes] starting static servers for exposes...');
  const pServe = run('pnpm', ['--filter', '"federated-css-react-ssr_expose-*"', '-r', 'run', 'serve']);

  // Wait for remoteEntry.js endpoints (server side) to be reachable before proceeding
  await waitOn({
    resources: [
      'http://localhost:3001/server/remoteEntry.js',
      'http://localhost:3002/server/remoteEntry.js',
      'http://localhost:3003/server/remoteEntry.js',
      'http://localhost:3004/server/remoteEntry.js',
      'http://localhost:3005/server/remoteEntry.js',
      'http://localhost:3006/server/remoteEntry.js',
      'http://localhost:3007/server/remoteEntry.js',
    ],
    timeout: 480000,
    validateStatus: s => s >= 200 && s < 500,
  });
  console.log('[exposes] all server remoteEntry.js endpoints are up.');
  process.on('SIGINT', () => pServe.kill('SIGINT'));
  process.on('SIGTERM', () => pServe.kill('SIGTERM'));
  // keep process alive
  await new Promise(() => {});
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
