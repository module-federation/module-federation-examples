const path = require('path');
const { merge } = require('webpack-merge');
const sharedConfig = require('./webpack.shared');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const getModuleFederationPlugin = require('./module-federation');

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
    publicPath: 'http://localhost:3000/static/',
  },
  plugins: [getModuleFederationPlugin(ModuleFederationPlugin).client],
};

module.exports = merge(sharedConfig, webpackConfig);
