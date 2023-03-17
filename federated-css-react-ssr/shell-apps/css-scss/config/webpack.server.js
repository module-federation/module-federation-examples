const path = require("path");
const { merge } = require("webpack-merge");
const shared = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");

module.exports = merge(shared, {
  name: "server",
  target: false,
  "optimization": {
    "minimize": false
  },
  entry: ["@babel/polyfill", path.resolve(__dirname, "../server/index.js")],
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  mode: "production",
  plugins: [
    ...moduleFederationPlugin.server,
  ],
  stats: {
    colors: true,
  },
});
