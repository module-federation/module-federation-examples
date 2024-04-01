import * as path from 'node:path';

import { readConfig } from '@remix-run/dev/dist/config.js';
import { getRoutes, routeSet } from './utils/get-routes.js';
import { RemixAssetsManifestPlugin } from './utils/RemixAssetsManifestPlugin.js';
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const remixConfig = await readConfig();

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  name: 'browser',
  mode,
  devtool: mode === 'development' ? 'inline-cheap-source-map' : undefined,
  entry: {
    'entry.client': remixConfig.entryClientFilePath,
    ...getRoutes(remixConfig),
  },
  externalsType: 'module',
  experiments: {
    outputModule: true,
    topLevelAwait: true,
  },
  output: {
    path: remixConfig.assetsBuildDirectory,
    publicPath: 'auto',
    module: true,
    library: { type: 'module' },
    chunkFormat: 'module',
    chunkLoading: 'import',
    assetModuleFilename: '_assets/[name]-[contenthash][ext]',
    cssChunkFilename: '_assets/[name]-[contenthash].css',
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].js',
  },
  module: {
    rules: [
      // {
      //   include: (input) => routeSet.has(input),
      //   use: [
      //     // {
      //     //   loader: "babel-loader",
      //     //   options: {
      //     //     plugins: [["eliminator", {namedExports: ["action", "loader"]}]],
      //     //   },
      //     // },
      //     {
      //       loader: 'builtin:swc-loader',
      //       options: {
      //         jsc: {
      //           parser: {
      //             syntax: 'ecmascript',
      //             jsx: true,
      //           },
      //         }
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.[jt]sx?$/,
      //   exclude: (input) => routeSet.has(input),
      //   use: [
      //     {
      //       loader: 'builtin:swc-loader',
      //       options: {
      //         jsc: {
      //           parser: {
      //             syntax: 'ecmascript',
      //             jsx: true,
      //           },
      //         }
      //       },
      //     },
      //   ],
      // },
    ],
  },
  cache: false,
  optimization: {
    moduleIds: 'named',
    runtimeChunk: 'single',
    chunkIds: 'named',
    // treeshake unused code in development
    // needed so that browser build does not pull in server code
    usedExports: true,
    innerGraph: true,
    splitChunks: {
      chunks: 'async',
    },
    minimize: mode === 'production',
  },
  plugins: [new RemixAssetsManifestPlugin(remixConfig)],
};

export default config;
