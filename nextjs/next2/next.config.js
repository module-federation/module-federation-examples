const { moduleFederationPlugin } = require("./withModuleFederation");
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    const W5Plugins = config.plugins.filter((plugin) => {
      // not currently supported in Webpack 5
      return plugin.constructor.name !== "ReactFreshWebpackPlugin";
    });
    config.experiments = {
      importAsync: true,
      topLevelAwait: true,
      importAwait: true,
    };
    if (!isServer) {
      config.output.publicPath = "http://localhost:3001/_next/";
      config.output.library = "next2";
    } else {
    }
    const ModuleFederationPlugin = moduleFederationPlugin(webpack);
    W5Plugins.push(
      new ModuleFederationPlugin({
        name: "next2",
        library: { type: config.output.libraryTarget, name: "next2" },
        filename: "static/runtime/remoteEntry.js",
        remotes: {
          next1: isServer
            ? path.resolve(
                __dirname,
                "../next1/.next/server/static/runtime/remoteEntry.js"
              )
            : "next1",
        },

        exposes: {
          "./nav": "./components/nav",
        },
        // shared: {
        //   react: isServer ? {} : {singleton:true}
        // },
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
