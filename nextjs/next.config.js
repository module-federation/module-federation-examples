const { moduleFederationPlugin } = require("./withModuleFederation");
const withPlugins = require("next-compose-plugins");
const deps = require("./package.json").dependencies;
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    const W5Plugins = config.plugins.filter((plugin) => {
      // not currently supported in Webpack 5
      return plugin.constructor.name !== "ReactFreshWebpackPlugin";
    });
    const ModuleFederationPlugin = moduleFederationPlugin(webpack);
    W5Plugins.push(
      new ModuleFederationPlugin({
        name: "app1",
        library: { type: "var", name: "app1" },
        filename: "remoteEntry.js",
        exposes: {
          "./nav": "./components/nav",
        },
        shared: {},
      })
    );

    config.plugins = W5Plugins;
    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
