import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import enhancedFederation from '@module-federation/enhanced';
const { ModuleFederationPlugin } = enhancedFederation;
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

export default {
  context: __dirname,
  entry: {
    main: './src/main.js',
    app: './src/other.jsx',
    apeep: './src/App.jsx',
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true
    },
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'swc-loader',
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
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  optimization:{
    runtimeChunk: 'single'
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
    new HtmlWebpackPlugin({
      template: './index.html',
      scriptLoading: 'module',
      excludeChunks: ['rspack','app']
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  devtool: false,
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
  output: {
    publicPath: 'auto',
    chunkFormat: 'module',
    chunkLoading: 'import',
    workerChunkLoading: 'import',
    wasmLoading: 'fetch',
    library: { type: 'module' },
    module: true,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
};
