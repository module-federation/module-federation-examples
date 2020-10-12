const webpack = require("webpack");

const {merge} = require("webpack-merge");
const baseConfig = require("./server.base");
// const WriteFileWebpackPlugin = require('write-file-webpack-plugin')

const config = merge(baseConfig, {
  plugins: [
    // new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: "development",
  performance: {
    hints: false,
  },
});

module.exports = config;
