const path = require('path');
const { merge } = require('webpack-merge');
const shared = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/client/index')],
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'http://localhost:3001/static/',
  },
  plugins: [moduleFederationPlugin(ModuleFederationPlugin).client],
};

module.exports = merge(shared, webpackConfig);
