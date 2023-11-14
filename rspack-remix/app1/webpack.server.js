import * as fs from 'node:fs';
import * as path from 'node:path';

import { readConfig } from '@remix-run/dev/dist/config.js';
import nodeExternals from 'webpack-node-externals';
import { getManifest } from './utils/manifest.js';
import { createServerBuildEntry } from './utils/server-build-entry.js';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const remixConfig = await readConfig();
const isModule = remixConfig.serverModuleFormat === 'esm';

if (!isModule) {
  if (!fs.existsSync('./build')) {
    fs.mkdirSync('./build');
  }
  fs.writeFileSync('./build/package.json', JSON.stringify({ type: 'commonjs' }));
}

const manifest = getManifest();
const serverBuildModule = './.cache/server-build.js';
const serverBuildEntry = createServerBuildEntry(remixConfig, manifest);
fs.writeFileSync(serverBuildModule, serverBuildEntry, 'utf8');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  name: 'server',
  mode,
  devtool: mode === 'development' ? false : undefined,
  target: 'async-node',
  entry: remixConfig.serverEntryPoint
    ? path.resolve(remixConfig.rootDirectory, remixConfig.serverEntryPoint)
    : serverBuildModule,
  experiments: isModule ? { outputModule: true } : undefined,
  externalsType: isModule ? 'module' : undefined,
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: [/^@remix-run\/dev/],
      importType: isModule ? 'module' : 'commonjs',
    }),
  ],
  output: {
    filename: path.basename(remixConfig.serverBuildPath),
    library: { type: isModule ? 'module' : 'commonjs' },
    chunkFormat: isModule ? 'module' : 'commonjs',
    chunkLoading: isModule ? 'import' : undefined,
    module: isModule,
    path: path.dirname(remixConfig.serverBuildPath),
    publicPath: remixConfig.publicPath,
    assetModuleFilename: '_assets/[name]-[contenthash][ext]',
    cssChunkFilename: '_assets/[name]-[contenthash].css',
    chunkFilename: '[name]-[chunkhash].js',
  },
  optimization: {
    moduleIds: 'named',
  },
  resolve: {
    alias: {
      '@remix-run/dev/server-build.js': serverBuildModule,
    },
  },
  module: {},
  plugins: [],
};

export default config;
