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
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') {
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
}

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
    'css-isolation/app2/rspack.config.js',
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

test('Rsbuild Node examples use output.target instead of removed output.targets', () => {
  for (const config of ['unit-test/host/rsbuild.config.ts', 'unit-test/remote/rsbuild.config.ts']) {
    const source = fs.readFileSync(path.join(root, config), 'utf8');
    expect(source).toContain("target: 'node'");
    expect(source).not.toMatch(/\btargets\s*:/);
  }
});
