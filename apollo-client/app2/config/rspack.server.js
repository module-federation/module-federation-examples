const path = require('path');
const { merge } = require('webpack-merge');
const shared = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack')

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  name: 'server',
  target: 'async-node',
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/server/index')],
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs-module',
  },
  externals: ['express'],
  mode: 'production',
  plugins: [...moduleFederationPlugin(ModuleFederationPlugin).server],
  stats: {
    colors: true,
  },
};

module.exports = merge(shared, webpackConfig);
