const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const path = require('path');

const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  mode: 'development',
  target: 'web',
  devServer: {
    // App2 is loaded as a remote into App1 (different origin). The injected
    // webpack-dev-server client/overlay can crash the host page when executed
    // cross-origin, which breaks the Playwright E2E. Disable it for stability.
    client: false,
    hot: false,
    liveReload: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  output: {
    publicPath: 'auto',
    // Avoid webpack-dev-server warning overlay from MF "external script" loader code.
    environment: { asyncFunction: true },
  },
  resolve: {
    alias: {
      'shared-context_shared-library': path.resolve(__dirname, '../shared-library'),
      // Ensure the shared library resolves the same React instance as this app.
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      name: 'app2',
      shareStrategy: 'loaded-first',
      filename: 'remoteEntry.js',
      exposes: {
        './Welcome': './src/Welcome',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'shared-context_shared-library': {
          import: 'shared-context_shared-library',
          requiredVersion: require('../shared-library/package.json').version,
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
