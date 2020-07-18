const path = require("path");
const merge = require("webpack-merge");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const { client: clientLoaders } = require("./loaders");
const plugins = require("./plugins");
const common = require("./common.base");

module.exports = merge.smart(common, {
  name: "client",
  target: "web",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../src/index.js")],
  output: {
    publicPath: "http://localhost:3000/static/",
  },
  module: {
    rules: clientLoaders,
  },
  plugins: [
    ...plugins.client,
    new ModuleFederationPlugin({
      name: "website1",
      library: { type: "var", name: "website1" },
      filename: "container.js",
      remotes: {
        website2: "website2",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
