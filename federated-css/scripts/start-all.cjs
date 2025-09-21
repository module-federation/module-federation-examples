const { spawn } = require('node:child_process');
const waitOn = require('wait-on');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function run(cmd, args) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true });
}

async function main() {
  const reactConsumers = [
    { dir: 'combination-of-4', port: 3001 },
    { dir: 'combination-of-5', port: 3002 },
    { dir: 'css-and-styled-component', port: 3003 },
    { dir: 'css-module-and-jss', port: 3004 },
    { dir: 'less-and-scss', port: 3005 },
    { dir: 'tailwind-global-and-less', port: 3006 },
    { dir: 'tailwind-module-and-jss', port: 3007 },
  ];

  const exposes = [4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007];

  const nextConsumers = [
    { dir: 'combination-of-4', port: 8081 },
    { dir: 'jss-and-tailwind-global', port: 8082 },
    { dir: 'jss-css-and-tailwind-module', port: 8083 },
    { dir: 'less-and-styled-component', port: 8084 },
  ];

  const procs = [];

  console.log('[federated-css] starting consumers-react (sequential dev servers)...');
  for (const { dir, port } of reactConsumers) {
    const cwd = path.join('consumers-react', dir);
    const p = run('pnpm', ['-C', cwd, 'run', 'start']);
    procs.push(p);
    await waitOn({ resources: [`http://localhost:${port}`], timeout: 480000, validateStatus: s => s >= 200 && s < 500 });
    console.log(`[federated-css] consumers-react ${dir} up at ${port}`);
  }

  console.log('[federated-css] building expose apps (sequential)...');
  for (const port of exposes) {
    const dirMap = {
      4000: 'expose-css',
      4001: 'expose-css-module',
      4002: 'expose-jss',
      4003: 'expose-less',
      4004: 'expose-scss',
      4005: 'expose-styled-component',
      4006: 'expose-tailwind-css-global',
      4007: 'expose-tailwind-css-module',
    };
    const dir = dirMap[port];
    if (!dir) continue;
    const cwd = path.join('expose-remotes', dir);
    await new Promise((res, rej) => {
      const p = run('pnpm', ['-C', cwd, 'run', 'build']);
      p.on('exit', c => (c === 0 ? res() : rej(new Error(`build ${dir} failed`))));
    });
  }

  console.log('[federated-css] serving expose apps (sequential)...');
  for (const port of exposes) {
    const dirMap = {
      4000: 'expose-css',
      4001: 'expose-css-module',
      4002: 'expose-jss',
      4003: 'expose-less',
      4004: 'expose-scss',
      4005: 'expose-styled-component',
      4006: 'expose-tailwind-css-global',
      4007: 'expose-tailwind-css-module',
    };
    const dir = dirMap[port];
    if (!dir) continue;
    const cwd = path.join('expose-remotes', dir);
    const p = run('pnpm', ['-C', cwd, 'run', 'serve']);
    procs.push(p);
    await waitOn({ resources: [`http://localhost:${port}`], timeout: 480000, validateStatus: s => s >= 200 && s < 500 });
    console.log(`[federated-css] expose ${dir} up at ${port}`);
  }

  console.log('[federated-css] starting Next consumers (sequential dev servers)...');
  for (const { dir, port } of nextConsumers) {
    const cwd = path.join('consumers-nextjs', dir);
    const p = run('pnpm', ['-C', cwd, 'run', 'start']);
    procs.push(p);
    await waitOn({ resources: [`http://localhost:${port}`], timeout: 480000, validateStatus: s => s >= 200 && s < 500 });
    console.log(`[federated-css] next ${dir} up at ${port}`);
  }

  console.log('[federated-css] all ports are up.');

  const killAll = sig => { procs.forEach(pr => pr.kill(sig)); };
  process.on('SIGINT', () => killAll('SIGINT'));
  process.on('SIGTERM', () => killAll('SIGTERM'));

  await new Promise(() => {});
}

main().catch(err => { console.error(err); process.exit(1); });
