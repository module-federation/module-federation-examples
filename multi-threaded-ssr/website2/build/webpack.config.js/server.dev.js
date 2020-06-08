const webpack = require("webpack");
const WriteFileWebpackPlugin = require("write-file-webpack-plugin");
const merge = require("webpack-merge");
const baseConfig = require("./server.base");

const config = merge.smart(baseConfig, {
  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: "development",
  performance: {
    hints: false,
  },
});

module.exports = config;
