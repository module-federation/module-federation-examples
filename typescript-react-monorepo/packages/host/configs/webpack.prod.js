const path = require("path");
const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base");

// @ts-ignore
module.exports = merge(webpackBaseConfig, {
  mode: "production",
  devtool: "cheap-source-map",

  cache: true,
  optimization: {
    minimize: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist"),
    },
    port: 3000,
    compress: true,
    historyApiFallback: true,
  },
});
