const { pnpm } = require('../package.json');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createRequire } = require('module');

const exampleRequire = createRequire(path.resolve(__dirname, '../error-boundary/app1/package.json'));
const webpackRequire = createRequire(require.resolve('webpack/package.json'));

test('Webpack retains the internal APIs used by Module Federation', () => {
  const extractUrlAndGlobal = webpackRequire('./lib/util/extractUrlAndGlobal');

  expect(webpackRequire('./package.json').version).toBe(pnpm.overrides.webpack);
  expect(extractUrlAndGlobal('remote@http://localhost:3002/remoteEntry.js')).toEqual([
    'http://localhost:3002/remoteEntry.js',
    'remote',
  ]);
});

test('federation runtime supports hashed filenames and asynchronous chunks', async () => {
  const webpack = require('webpack');
  const { ModuleFederationPlugin } = exampleRequire('@module-federation/enhanced/webpack');
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'federation-webpack-'));
  fs.writeFileSync(path.join(directory, 'index.js'), "import('./lazy').then(console.log);\n");
  fs.writeFileSync(path.join(directory, 'lazy.js'), 'export default 42;\n');

  const compiler = webpack({
    mode: 'production',
    context: directory,
    entry: './index.js',
    output: {
      path: path.join(directory, 'dist'),
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].js',
      publicPath: 'auto',
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'compatibility_fixture',
        filename: 'remoteEntry.js',
        dts: false,
        exposes: { './lazy': './lazy.js' },
      }),
    ],
  });

  try {
    const stats = await new Promise((resolve, reject) => {
      compiler.run((error, result) => (error ? reject(error) : resolve(result)));
    });
    expect(stats.toJson({ all: false, errors: true }).errors).toEqual([]);
    expect(fs.readdirSync(path.join(directory, 'dist', 'static', 'js'))).toEqual(
      expect.arrayContaining([expect.stringMatching(/^main\.[a-f0-9]{8}\.js$/)]),
    );
  } finally {
    await new Promise((resolve, reject) => {
      compiler.close(error => (error ? reject(error) : resolve()));
    });
    fs.rmSync(directory, { recursive: true, force: true });
  }
}, 30_000);
