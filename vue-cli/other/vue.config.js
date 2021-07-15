const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  publicPath: "http://localhost:9001/",
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "other",
        filename: "remoteEntry.js",
        exposes: {
          "./MainComponent": "./src/components/MainComponent",
        },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 9001,
  },
};
