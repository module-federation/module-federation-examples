const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const customRspackConfigs = [
  'apollo-client/app1/config/rspack.client.js',
  'apollo-client/app1/config/rspack.server.js',
  'apollo-client/app2/config/rspack.client.js',
  'apollo-client/app2/config/rspack.server.js',
  'federated-library-from-cdn/remoteLibrary/rspack.dev.js',
  'federated-library-from-cdn/remoteLibrary/rspack.prod.js',
  'react-16-17-18-ssr/remote1/config/webpack.client.js',
  'react-16-17-18-ssr/remote1/config/webpack.server.js',
  'react-16-17-18-ssr/remote2/config/webpack.client.js',
  'react-16-17-18-ssr/remote2/config/webpack.server.js',
  'react-16-17-18-ssr/shell/config/webpack.client.js',
  'react-16-17-18-ssr/shell/config/webpack.server.js',
  'react-18-code-splitting/app1/config/webpack.client.js',
  'react-18-code-splitting/app1/config/webpack.server.js',
  'react-18-code-splitting/app2/config/webpack.client.js',
  'react-18-code-splitting/app2/config/webpack.server.js',
  'rspack-remix/app1/webpack.browser.js',
  'rspack-remix/app1/webpack.server.js',
  'rspack-remix/app2/webpack.browser.js',
  'rspack-remix/app2/webpack.server.js',
];

const collectRspackConfigs = directory => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const configs = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.') || ['node_modules', 'dist', 'build'].includes(entry.name)) {
      continue;
    }

    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      configs.push(...collectRspackConfigs(entryPath));
    } else if (/^rspack\.config\.[cm]?js$/.test(entry.name)) {
      configs.push(path.relative(root, entryPath));
    }
  }

  return configs;
};

const configs = [...new Set([...collectRspackConfigs(root), ...customRspackConfigs])];

const removedRspack2Options = [
  'experiments: {\n    css: true',
  'experiments: { outputModule: true',
  'topLevelAwait: true',
  'libraryTarget:',
  'rspackExperiments',
  'onAfterSetupMiddleware',
  'removeAvailableModules',
  'strictExportPresence',
];

test('Rspack configs do not use options removed in Rspack 2', () => {
  expect(configs.length).toBeGreaterThan(80);

  for (const config of configs) {
    const source = fs.readFileSync(path.join(root, config), 'utf8');

    for (const removedOption of removedRspack2Options) {
      expect({ config, removedOption, source: source.includes(removedOption) }).toEqual({
        config,
        removedOption,
        source: false,
      });
    }
  }
});

test('CSS entry points declare a Rspack 2 module type', () => {
  const cssConfigs = [
    'complete-react-case/component-app/rspack.config.js',
    'css-isolation/app1/rspack.config.js',
    'rspack-webpack-interop/app-04/rspack.config.js',
    'rspack-webpack-offload/component-app/rspack.config.js',
    'rspack_hmr/app2/rspack.config.js',
    'rspack_hmr/host/rspack.config.js',
    'rspack_hmr/runhost/rspack.config.js',
  ];

  for (const config of cssConfigs) {
    const source = fs.readFileSync(path.join(root, config), 'utf8');
    expect(source).toMatch(/test: \/\\\.css\$?\/[^]*?type: 'css(\/auto)?'/);
  }
});

test('the CSS isolation remote keeps its shadow-DOM style insertion hook', () => {
  const source = fs.readFileSync(path.join(root, 'css-isolation/app2/rspack.config.js'), 'utf8');
  expect(source).toContain("type: 'javascript/auto'");
  expect(source).toContain("loader: 'style-loader'");
  expect(source).toContain("insert: require.resolve('./styleLoader.js')");
  expect(source).toContain('lazyCompilation: false');
});

test('the cross-origin React adapter keeps its fallback as an async chunk', () => {
  const directory = path.join(root, 'runtime-plugins/multiple-react-versions/app2');
  const config = fs.readFileSync(path.join(directory, 'rspack.config.js'), 'utf8');
  const plugin = fs.readFileSync(path.join(directory, 'react-adapter-runtime-plugin.ts'), 'utf8');

  expect(config).toContain('lazyCompilation: false');
  expect(plugin).toContain("import('./fallback.js')");
});

test('Rsbuild Node examples use output.target instead of removed output.targets', () => {
  for (const config of ['unit-test/host/rsbuild.config.ts', 'unit-test/remote/rsbuild.config.ts']) {
    const source = fs.readFileSync(path.join(root, config), 'utf8');
    expect(source).toContain("target: 'node'");
    expect(source).not.toMatch(/\btargets\s*:/);
  }
});

test('HMR examples only watch in development and declare the DTS compiler', () => {
  for (const app of ['app2', 'host', 'runhost']) {
    const directory = path.join(root, 'rspack_hmr', app);
    const source = fs.readFileSync(path.join(directory, 'rspack.config.js'), 'utf8');
    const packageJson = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
    expect(source).toContain('watch: isDev');
    expect(packageJson.devDependencies.typescript).toBeDefined();
  }
});
