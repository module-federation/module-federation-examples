const { moduleFederationPlugin } = require("./withModuleFederation");
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
    console.log(config.entry().then(console.log));
    const ModuleFederationPlugin = moduleFederationPlugin(webpack);
    W5Plugins.push(
      new ModuleFederationPlugin({
        name: "app1",
        library: { type: "var", name: "app1" },
        filename: "static/runtime/remoteEntry.js",
        exposes: {
          "./nav": "./components/nav",
        },
        shared: {
          reactRexport: {
            import: "./react",
            shareKey: "react",
            shareScope: "default",
            singleton: true,
            // strictVersion: true, // don't use shared version when version isn't valid. Singleton or modules without fallback will throw, otherwise fallback is used
            version: require("react").version,
            requiredVersion: require("./package.json").dependencies["react"],
          },
        },
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
