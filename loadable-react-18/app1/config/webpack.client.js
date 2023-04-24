const path = require('path');
const { merge } = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const shared = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
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
    publicPath: 'http://localhost:3000/static/',
  },
  plugins: [
    new LoadablePlugin({
      writeToDisk: true,
    }),

    ...moduleFederationPlugin.client,
  ],
};

module.exports = merge(shared, webpackConfig);
