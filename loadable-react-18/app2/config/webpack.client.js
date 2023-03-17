const path = require('path');
const { merge } = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const shared = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');

module.exports = merge(shared, {
  name: 'client',
  target: 'web',
  entry: {
    clientAppEntrypoint: [
      '@babel/polyfill',
      path.resolve(__dirname, '../src/client/clientAppEntrypoint'),
    ],
  },
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'http://localhost:3001/static/',
  },
  plugins: [new LoadablePlugin({ writeToDisk: true }), ...moduleFederationPlugin.client],
});
