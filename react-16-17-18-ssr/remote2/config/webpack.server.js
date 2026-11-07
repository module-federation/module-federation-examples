const path = require('path');
const { merge } = require('webpack-merge');
const sharedWebpackConfig = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    library: {
      type: 'commonjs-module',
    },
  },
  target: 'async-node',
  name: 'server',
  plugins: [...moduleFederationPlugin.server],
};

module.exports = merge(sharedWebpackConfig, webpackConfig);
