const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const fs = require("fs");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const FederatedRuntimePlugin = require("@module-federation/federated-runtime-plugin/FederatedRuntimePlugin");
const HttpRuntime = require("@module-federation/federated-runtime-plugin/HttpRuntime");
const common = require("./common.base");
const { server: serverLoaders } = require("./loaders");
const plugins = require("./plugins");
const config = require("../config");

const { serverPath } = config[process.env.NODE_ENV || "development"];

const remotes = {
  website2: "http://localhost:3001/edge/remote-entry.js",
};

module.exports = merge.smart(common, {
  name: "server",
  target: "async-node",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../server/index.js")],
  output: {
    path: serverPath,
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  externals: ["enhanced-resolve"],
  module: {
    rules: serverLoaders,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    ...plugins.server,
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "website1",
      library: { type: "commonjs2" },
      filename: "container.js",
      remotes,
      shared: ["react", "react-dom"],
    }),
    new FederatedRuntimePlugin({
      remotes,
      runtimes: [HttpRuntime],
    }),
  ],
  stats: {
    colors: true,
  },
});
