const { execFileSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { dirname, relative } = require('path');

const packageFiles = execFileSync('git', ['ls-files', '*package.json'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter(file => !file.includes('/node_modules/'));

const lifecycleTargets = [
  ['start', 'prestart'],
  ['dev', 'predev'],
  ['serve', 'preserve'],
];

let updated = 0;
const skipped = [];

for (const file of packageFiles) {
  const json = JSON.parse(readFileSync(file, 'utf8'));
  if (!json.scripts) {
    skipped.push({ file, reason: 'no scripts' });
    continue;
  }

  let changed = false;
  const packageDir = dirname(file);
  const scriptPath = relative(packageDir, 'scripts/track-demo-run.js').replace(/\\/g, '/');
  const command = `node ${scriptPath}`;

  for (const [target, pretarget] of lifecycleTargets) {
    if (!json.scripts[target]) continue;
    if (json.scripts[pretarget]) {
      skipped.push({ file, reason: `${pretarget} exists` });
      continue;
    }
    json.scripts[pretarget] = command;
    changed = true;
  }

  if (!changed) continue;

  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
  updated += 1;
}

console.log(JSON.stringify({ considered: packageFiles.length, updated, skipped }, null, 2));
