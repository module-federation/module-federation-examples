const path = require('path');
const { merge } = require('webpack-merge');
const sharedWebpackConfig = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');
const {HtmlRspackPlugin} = require('@rspack/core')

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    publicPath: 'http://localhost:3001/client/',
  },
  plugins: [
    moduleFederationPlugin.client,
    new HtmlRspackPlugin({
      template: './src/index.html',
    }),
  ],
};

module.exports = merge(sharedWebpackConfig, webpackConfig);
