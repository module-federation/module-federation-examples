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
    p.on('exit', code => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} failed (${code})`))));
  });
}

async function main() {
  // Build and serve each expose sequentially, waiting for both server/client remoteEntry.js
  const exposes = [
    { dir: 'expose-css', port: 3001 },
    { dir: 'expose-jss', port: 3002 },
    { dir: 'expose-tailwind-css', port: 3003 },
    { dir: 'expose-scss', port: 3004 },
    { dir: 'expose-styled-component', port: 3005 },
    { dir: 'expose-css-module', port: 3006 },
    { dir: 'expose-less', port: 3007 },
  ];

  // Clean up all ports first with more aggressive approach
  console.log('[exposes] cleaning up ports...');
  for (const { port } of exposes) {
    await killPort(port);
    // Additional cleanup attempt
    try {
      await killPort(port);
    } catch (e) {
      // Ignore
    }
  }
  await new Promise(resolve => setTimeout(resolve, 3000));

  const procs = [];
  for (const { dir, port } of exposes) {
    const cwd = path.join('expose-apps', dir);
    console.log(`[exposes] building ${dir}...`);
    await exec('pnpm', ['-C', cwd, 'run', 'build']);
    console.log(`[exposes] serving ${dir} on ${port}...`);
    const p = run('pnpm', ['-C', cwd, 'run', 'serve']);
    procs.push(p);
    await waitOn({
      resources: [
        `http://localhost:${port}/server/remoteEntry.js`,
        `http://localhost:${port}/client/remoteEntry.js`,
      ],
      timeout: 480000,
      validateStatus: s => s >= 200 && s < 400,
    });
    console.log(`[exposes] ${dir} ready on ${port}.`);
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
