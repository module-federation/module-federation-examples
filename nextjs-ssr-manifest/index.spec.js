const fs = require('fs');
const spawn = require('cross-spawn');
const { resolve } = require('path');

const isHiddenDirectory = function (path) {
  return /(^|\/)\.[^\/\.]/g.test(path);
};

const blockDir = ['node_modules', 'public', 'dist'];

const folders = [
  'basic-host-remote',
  'bi-directional',
  'startup-code',
  'different-react-versions',
  'self-healing',
  'comprehensive-demo',
  'server-side-rendering',
  'server-side-render-only',
  'dynamic-system-host',
  'shared-context',
  'shared-routing',
  'shared-routes2',
  'typescript',
  'nested',
  'nextjs-sidecar',
  'version-discrepancy',
  'dashboard-example',
  'redux-reducer-injection',
  'angular-universal-ssr',
  'advanced-api/dynamic-remotes',
  'advanced-api/automatic-vendor-sharing',
  'nextjs-bi-directional',
  'vue3-demo',
  'nextjs',
];

function spawnAsPromise(cmd, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, options);
    child.on('close', code => {
      code === 0 ? resolve(true) : reject(false);
    });
    child.on('error', () => {
      reject(false);
    });
  });
}

function getFiles(source) {
  const result = [];
  function walk(src) {
    const dirents = fs.readdirSync(src, { withFileTypes: true });
    for (const dirent of dirents) {
      if (
        dirent.isDirectory() &&
        !isHiddenDirectory(dirent.name) &&
        !blockDir.includes(dirent.name)
      ) {
        const resolvedPath = resolve(src, dirent.name);
        const hasPkgJson = fs.existsSync(`${resolvedPath}/package.json`);
        if (hasPkgJson) {
          result.push(resolvedPath);
        }
        walk(resolvedPath);
      }
    }
  }
  walk(source);
  return result;
}

for (const folder of folders) {
  describe(`${folder}`, () => {
    const apps = getFiles(resolve(__dirname, '..', folder));
    for (app of apps) {
      it(`${app} should build`, async () => {
        const result = await spawnAsPromise('yarn', ['build'], { cwd: app });
        expect(result).toEqual(true);
      });
    }
  });
}
