import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import RefreshPlugin from '@rspack/plugin-react-refresh';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === 'development';

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

export default defineConfig({
  context: __dirname,
  entry: {
    main: './src/main.js',
    app: './src/other.jsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true
    }
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: true,
                    refresh: true,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'rspack',
      runtime: false,
      filename: 'remoteEntry.js',
      exposes: {
        './tjing': './src/App.jsx'
      },
      shared: {
        react: {
          singleton: true,
        },
        "react/jsx-dev-runtime": {
          singleton: true,
        },
        "react/jsx-runtime": {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        }
      },
    }),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
      scriptLoading: 'module',
      excludeChunks: ['rspack','app']
    }),
    isDev ? new RefreshPlugin() : null,
  ].filter(Boolean),
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    outputModule: true,
    css: true,
  },
  externalsType: 'module',
  output: {
    chunkFormat: 'module',
    chunkLoading: 'import',
    workerChunkLoading: 'import',
    wasmLoading: 'fetch',
    library: { type: 'module' },
    module: true,
  },
});
