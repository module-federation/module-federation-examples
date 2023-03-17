const path = require("path");
const { merge } = require("webpack-merge");
const shared = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");

module.exports = merge(shared, {
  name: "client",
  target: "web",
  "optimization": {
    "minimize": false
  },
  entry: ["@babel/polyfill", path.resolve(__dirname, "../src/index.js")],
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "http://localhost:4001/static/",
  },
  plugins: [
    moduleFederationPlugin.client,
  ],
});
