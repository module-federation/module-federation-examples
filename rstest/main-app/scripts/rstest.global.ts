import killPort from 'kill-port';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

type Child = ReturnType<typeof spawn>;

let children: Child[] = [];

const start = (cwd: string, args: string[]) =>
  spawn('pnpm', args, {
    cwd,
    stdio: 'inherit',
    env: process.env,
  });

export async function setup() {
  // Rstest injects this shim when executing bundled modules inside its VM wrapper,
  // but the generated `rstest-runtime.js` is loaded via Node `require()`, so it
  // does not receive the injected parameter. MF's embedded runtime expects this
  // identifier to exist (it uses it to dynamically import the bundler runtime).
  //
  // Provide a global fallback so federation runtime can load in the Node context.
  (globalThis as any).__rstest_dynamic_import__ = (specifier: string) => {
    if (typeof specifier === 'string' && specifier.startsWith('/')) {
      return import(pathToFileURL(specifier).href);
    }
    return import(specifier);
  };

  // Some MF runtime helpers (and some remote bundles) assume `self` exists.
  // In Node, alias it to `globalThis`.
  (globalThis as any).self = globalThis as any;

  // Ensure ports are free before starting.
  await killPort(3001).catch(() => {});

  const workspaceRoot = resolve(__dirname, '..', '..');
  const componentAppDir = resolve(workspaceRoot, 'component-app');

  // Ensure remotes are built before tests run (filesystem remotes require dist output).
  const run = (cwd: string, args: string[]) =>
    new Promise<void>((res, rej) => {
      const child = spawn('pnpm', args, { cwd, stdio: 'inherit', env: process.env });
      child.on('exit', (code) => (code === 0 ? res() : rej(new Error(`${args.join(' ')} exited ${code}`))));
      child.on('error', rej);
    });

  await run(componentAppDir, ['build']);

  // Start servers. Use `pnpm start` which builds then serves from dist.
  children = [start(componentAppDir, ['start'])];

  const waitFor = async (url: string, timeoutMs = 60_000) => {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      try {
        const res = await fetch(url, { method: 'GET' });
        if (res.ok) return;
      } catch {}
      await new Promise((r) => setTimeout(r, 250));
    }
    throw new Error(`[rstest globalSetup] Timed out waiting for ${url}`);
  };

  // Wait for MF remote entries to be online.
  await Promise.all([
    waitFor('http://localhost:3001/remoteEntry.js'),
  ]);
}

export async function teardown() {
  // Kill by port first (covers detached/extra processes).
  await killPort(3001).catch(() => {});

  // Then kill tracked children (best effort).
  for (const child of children) {
    try {
      child.kill('SIGTERM');
    } catch {}
  }
  children = [];
}
