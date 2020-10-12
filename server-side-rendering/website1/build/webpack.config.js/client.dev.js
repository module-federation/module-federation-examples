const webpack = require("webpack");

const {merge} = require("webpack-merge");
const baseConfig = require("./client.base");

const config = merge(baseConfig, {
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false",
  ],
  plugins: [new webpack.HotModuleReplacementPlugin()],
  mode: "development",
  devtool: "source-map",
  performance: {
    hints: false,
  },
});

module.exports = config;
