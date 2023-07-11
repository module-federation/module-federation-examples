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
      name: 'host',
      isServer: true,
      library: { type: 'commonjs-module' },
      remotes: {
        RemoteRoutes: 'RemoteRoutes@http://localhost:3002/remoteEntry.js',
      },
      exposes: {},
      filename: 'remoteEntry.js',
      shared,
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
