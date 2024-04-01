import * as fs from 'node:fs';
import * as path from 'node:path';

import { readConfig } from '@remix-run/dev/dist/config.js';
import nodeExternals from 'webpack-node-externals';
import { default as Enhanced } from '@module-federation/enhanced';
import { default as NFP } from '@module-federation/node';

const { AsyncBoundaryPlugin, ModuleFederationPlugin } = Enhanced;
const { UniversalFederationPlugin } = NFP;
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
    environment: {
      module: isModule,
    },
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
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              target: 'es2019',
              jsx: 'automatic',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new AsyncBoundaryPlugin({
      excludeChunk: chunk => {
        return chunk.name === 'app1';
      },
    }),
    new UniversalFederationPlugin(
      {
        isServer: true,
        name: 'app1' ,
        filename: 'remoteEntry.js',
        remoteType: 'script',
        remotes: {
          app2: 'app2@http://localhost:3001/server/remoteEntry.js',
        },
        library: { type: isModule ? 'module' : 'commonjs-module', name: 'app1' },
        exposes: {
          './button': './components/Button.jsx',
        },
        shared: {
          'react/': {
            singleton: true,
          },
          react: {
            singleton: true,
          },
          'react-dom/': {
            singleton: true,
          },
          'react-dom': {
            singleton: true,
          },
        },
      },
      { ModuleFederationPlugin },
    ),
  ],
};

export default config;
