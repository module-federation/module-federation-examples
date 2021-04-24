const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;

const deps = require("./package.json").dependencies;

module.exports = {
  publicPath: "http://localhost:9000/",
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "core",
        filename: "remoteEntry.js",
        exposes: {
          "./Button": "./src/components/Button",
          "./Section": "./src/components/Section",
        },
      }),
    ],
  },
  devServer: {
    port: 9000,
  },
};
