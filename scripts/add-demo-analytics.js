const { execFileSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');

const measurementId = 'G-DRPXW0EEVT';
const repository = 'module-federation-examples';
const marker = 'Module Federation demo analytics';

const files = execFileSync('git', [
  'ls-files',
  '*index.html',
  '*_document.js',
  '*_document.jsx',
  '*_document.ts',
  '*_document.tsx',
], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter(file => !file.includes('/node_modules/'));

const escapeJs = value => JSON.stringify(value);

function getExample(file) {
  return file.split('/')[0] || 'root';
}

function getDemoPath(file) {
  return file.split('/').slice(0, -1).join('/') || 'root';
}

function browserScript(file) {
  const example = getExample(file);
  const demoPath = getDemoPath(file);

  return `(function () {
  var measurementId = ${escapeJs(measurementId)};
  var cidKey = 'mf_examples_ga_cid';
  var cid;
  try {
    cid = window.localStorage && window.localStorage.getItem(cidKey);
    if (!cid) {
      cid = String(Math.floor(Math.random() * 1000000000)) + '.' + String(Date.now());
      window.localStorage && window.localStorage.setItem(cidKey, cid);
    }
  } catch (error) {
    cid = String(Math.floor(Math.random() * 1000000000)) + '.' + String(Date.now());
  }

  var hostname = window.location.hostname;
  var runtimeContext = /^(localhost|127\\.|0\\.0\\.0\\.0|::1)$/.test(hostname) ? 'local' : 'hosted';
  var pageLocation = window.location.origin + window.location.pathname;
  var params = new URLSearchParams({
    v: '2',
    tid: measurementId,
    cid: cid,
    en: 'demo_app_view',
    'ep.repository': ${escapeJs(repository)},
    'ep.example': ${escapeJs(example)},
    'ep.demo_path': ${escapeJs(demoPath)},
    'ep.entrypoint': ${escapeJs(file)},
    'ep.runtime_context': runtimeContext,
    dl: pageLocation,
    dt: document.title || ('ModuleFederationExamples ' + ${escapeJs(demoPath)})
  });
  new Image().src = 'https://www.google-analytics.com/g/collect?' + params.toString();
})();`;
}

function htmlSnippet(file, indent) {
  const innerIndent = `${indent}  `;
  const script = browserScript(file)
    .split('\n')
    .map(line => `${innerIndent}${line}`)
    .join('\n');

  return `${indent}<!-- ${marker} -->\n${indent}<script>\n${script}\n${indent}</script>`;
}

function nextSnippet(file, indent) {
  const script = browserScript(file);
  return `${indent}{/* ${marker} */}\n${indent}<script\n${indent}  dangerouslySetInnerHTML={{\n${indent}    __html: ${escapeJs(script)},\n${indent}  }}\n${indent}/>`;
}

let updated = 0;
const skipped = [];

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  if (source.includes(marker)) {
    skipped.push({ file, reason: 'already instrumented' });
    continue;
  }

  let next;
  if (file.endsWith('index.html')) {
    const match = source.match(/^([ \t]*)<\/body>/m);
    next = match
      ? source.replace(match[0], `${htmlSnippet(file, match[1])}\n${match[0]}`)
      : `${source.trimEnd()}\n${htmlSnippet(file, '')}\n`;
  } else {
    const match = source.match(/^([ \t]*)<NextScript\s*\/>/m);
    if (!match) {
      skipped.push({ file, reason: 'no NextScript tag' });
      continue;
    }
    next = source.replace(match[0], `${nextSnippet(file, match[1])}\n${match[0]}`);
  }

  writeFileSync(file, next);
  updated += 1;
}

console.log(JSON.stringify({ considered: files.length, updated, skipped }, null, 2));
