const { spawn } = require('node:child_process');
const waitOn = require('wait-on');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function run(cmd, args) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true });
}

async function main() {
  // Start consumers-react in dev (avoid heavy prod builds), build+serve exposes, and start Next dev servers
  console.log('[federated-css] starting consumers-react (dev servers)...');
  const pReact = run('pnpm', ['--filter', '"@federated-css/*"', '-r', 'run', 'start']);

  console.log('[federated-css] building expose apps...');
  await new Promise((res, rej) => {
    const p = run('pnpm', ['--filter', '"federated-css-mono_expose-*"', '-r', 'run', 'build']);
    p.on('exit', c => (c === 0 ? res() : rej(new Error('build exposes failed'))));
  });
  console.log('[federated-css] serving expose apps...');
  const pExposes = run('pnpm', ['--filter', '"federated-css-mono_expose-*"', '-r', 'run', 'serve']);

  console.log('[federated-css] starting Next consumers (dev servers)...');
  const pNext = run('pnpm', ['--filter', '"@federated-css/next-*"', '-r', 'run', 'start']);

  await waitOn({
    resources: [
      // consumers-react ports
      'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003',
      'http://localhost:3004', 'http://localhost:3005', 'http://localhost:3006', 'http://localhost:3007',
      // exposes ports
      'http://localhost:4000', 'http://localhost:4001', 'http://localhost:4002', 'http://localhost:4003',
      'http://localhost:4004', 'http://localhost:4005', 'http://localhost:4006', 'http://localhost:4007',
      // next consumers
      'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083', 'http://localhost:8084'
    ],
    timeout: 480000,
    validateStatus: s => s >= 200 && s < 500,
  });
  console.log('[federated-css] all ports are up.');

  const killAll = sig => { pReact.kill(sig); pExposes.kill(sig); pNext.kill(sig); };
  process.on('SIGINT', () => killAll('SIGINT'));
  process.on('SIGTERM', () => killAll('SIGTERM'));

  await new Promise(() => {});
}

main().catch(err => { console.error(err); process.exit(1); });
