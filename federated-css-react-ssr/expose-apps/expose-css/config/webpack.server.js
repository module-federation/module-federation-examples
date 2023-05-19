const path = require("path");
const { merge } = require("webpack-merge");
const sharedWebpackConfig = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");

module.exports = merge(sharedWebpackConfig, {
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  mode: 'development',
  devtool: false,
  target: false,
  name: "server",
  plugins: [
    ...moduleFederationPlugin.server
  ],
});
