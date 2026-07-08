const { execFileSync } = require('child_process');
const { get } = require('https');
const { relative } = require('path');

if (process.env.CI || process.env.MF_EXAMPLES_ANALYTICS === '0') {
  process.exit(0);
}

function repoRoot() {
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
  } catch (error) {
    return process.cwd();
  }
}

const root = repoRoot();
const demoPath = relative(root, process.cwd()).replace(/\\/g, '/') || 'root';
const example = demoPath.split('/')[0] || 'root';
const lifecycle = process.env.npm_lifecycle_event || 'run';
const targetScript = lifecycle.startsWith('pre') ? lifecycle.slice(3) : lifecycle;

const params = new URLSearchParams({
  v: '2',
  tid: 'G-DRPXW0EEVT',
  cid: `${Math.floor(Math.random() * 1000000000)}.${Date.now()}`,
  en: 'demo_app_run',
  'ep.repository': 'module-federation-examples',
  'ep.example': example,
  'ep.demo_path': demoPath,
  'ep.entrypoint': 'package.json',
  'ep.runtime_context': 'package_script',
  'ep.npm_script': targetScript,
  'ep.package_name': process.env.npm_package_name || '',
  dl: `https://github.com/module-federation/module-federation-examples/tree/master/${demoPath}`,
  dt: `ModuleFederationExamples ${demoPath} ${targetScript}`,
});

const request = get(`https://www.google-analytics.com/g/collect?${params.toString()}`);
request.setTimeout(800, () => request.destroy());
request.on('error', () => {});
