const path = require('path');
const { merge } = require('webpack-merge');
const shared = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');

module.exports = merge(shared, {
  name: 'server',
  target: false,
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, '../src/server/index')],
    serverAppEntrypoint: path.resolve(__dirname, '../src/server/serverAppEntrypoint'),
  },
  externals: {
    express: 'express',
  },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs-module',
  },
  plugins: [...moduleFederationPlugin.server],
  stats: {
    colors: true,
  },
});
