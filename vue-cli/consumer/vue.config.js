const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;

const deps = require("./package.json").dependencies;

module.exports = {
  publicPath: "http://localhost:8080/",
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "consumer",
        filename: "remoteEntry.js",
        remotes: {
          core: "core@http://localhost:9000/remoteEntry.js",
        },
      }),
    ],
  },
};
