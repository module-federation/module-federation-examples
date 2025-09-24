const { spawn } = require('node:child_process');
const path = require('node:path');
const waitOn = require('wait-on');
const kill = require('kill-port');

const root = path.resolve(__dirname, '..');

function run(cmd, args, opts = {}) {
  return spawn(cmd, args, { stdio: 'inherit', cwd: root, shell: true, ...opts });
}

async function killPort(port) {
  try {
    await kill(port, 'tcp');
  } catch (e) {
    // Port might not be in use, ignore
  }
}

async function exec(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = run(cmd, args, opts);
    p.on('exit', code => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} failed with code ${code}`))));
  });
}

async function main() {
  // Build and start each shell sequentially to reduce CI CPU pressure.
  const shells = [
    { dir: 'css-jss', port: 4000 },
    { dir: 'css-scss', port: 4001 },
    { dir: 'jss-styled-components', port: 4002 },
    { dir: 'jss-styled-components-css-module', port: 4003 },
    { dir: 'less-scss', port: 4004 },
    { dir: 'scss-tailwind-css', port: 4005 },
  ];

  // Clean up all ports first
  console.log('[shells] cleaning up ports...');
  await Promise.all(shells.map(({ port }) => killPort(port)));
  await new Promise(resolve => setTimeout(resolve, 1000));

  const procs = [];
  for (const { dir, port } of shells) {
    const cwd = path.join('shell-apps', dir);
    console.log(`[shells] building ${dir}...`);
    await exec('pnpm', ['-C', cwd, 'run', 'build']);

    console.log(`[shells] starting ${dir} on port ${port}...`);
    const p = run('pnpm', ['-C', cwd, 'run', 'serve']);
    procs.push(p);

    await waitOn({
      resources: [`http://localhost:${port}`],
      timeout: 480000,
      validateStatus: s => s >= 200 && s < 500,
    });
    console.log(`[shells] ${dir} is up on ${port}.`);
  }

  const killAll = sig => procs.forEach(pr => pr.kill(sig));
  process.on('SIGINT', () => killAll('SIGINT'));
  process.on('SIGTERM', () => killAll('SIGTERM'));

  // keep process alive
  await new Promise(() => {});
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
