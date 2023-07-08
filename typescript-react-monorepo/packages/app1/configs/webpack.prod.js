const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base');

// @ts-ignore
module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: 'cheap-source-map',

  cache: true,
  optimization: {
    minimize: true,
  },
});
