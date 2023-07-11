/* eslint-disable */
// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const { UniversalFederationPlugin } = require('@module-federation/node')
const { shared } = require('./shared.config')

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: { index: './index.ts', autostart: './autostart.ts' },
  target: false,
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  externals: [nodeExternals()],
  devServer: {
    writeToDisk: true,
    open: true,
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new NodemonPlugin({
      script: './build/autostart.js',
    }),
    new UniversalFederationPlugin({
      name: 'RemoteRoutes',
      isServer: true,
      runtime:false,
      library: { type: 'commonjs-module' },
      remotes: {},
      filename: 'remoteEntry.js',
      shared,
      exposes: {
        './Users': './routes/users',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
