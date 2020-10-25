const deps = require("./package.json").dependencies;
const path = require("path");
const {
  withModuleFederation,
  MergeRuntime,
} = require("@module-federation/nextjs-mf");
module.exports = {
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
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
      shared: ["lodash"],
    };

    withModuleFederation(config, options, mfConf);

    if (!isServer) {
      config.output.publicPath = "http://localhost:3001/_next/";
    }

    config.plugins.push(new MergeRuntime());

    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
