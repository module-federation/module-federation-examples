const path = require("path");
const {merge} = require("webpack-merge");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const { client: clientLoaders } = require("./loaders");
const plugins = require("./plugins");
const common = require("./common.base");
const FederationModuleIdPlugin = require("webpack-federation-module-id-plugin");
const FederationStatsPlugin = require("webpack-federation-stats-plugin");

module.exports = merge(common, {
  name: "client",
  target: "web",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../src/index.js")],
  output: {
    publicPath: "http://localhost:3002/static/",
  },
  module: {
    rules: clientLoaders,
  },
  plugins: [
    ...plugins.client,
    new FederationStatsPlugin(),
    new FederationModuleIdPlugin(),
    new ModuleFederationPlugin({
      name: "website2",
      library: { type: "var", name: "website2" },
      filename: "container.js",
      exposes: {
        "./SomeComponent": "./src/components/SomeComponent",
      },
      remotes: {
        website1: "website1@http://localhost:3001/static/container.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
