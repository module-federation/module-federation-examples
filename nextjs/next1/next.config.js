const deps = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.experiments = { topLevelAwait: true };
    const mfConf = {
      name: "next1",
      library: { type: config.output.libraryTarget, name: "next1" },
      filename: "static/runtime/remoteEntry.js",
      exposes: {
        "./exposedTitle": "./components/exposedTitle",
      },
    };
    if (!isServer) {
      config.output.library = "next1";
      config.output.publicPath = "http://localhost:3000/_next/";
      config.externals = {
        react: "React",
      };
    } else {
      // shouldnt have to do this
      config.externals = {
        react: require.resolve("./react.js"),
      };
    }
    config.plugins.push(new ModuleFederationPlugin(mfConf));

    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
