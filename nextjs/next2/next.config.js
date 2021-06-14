const deps = require("./package.json").dependencies;
const path = require("path");
const {
  withModuleFederation,
  MergeRuntime,
} = require("@module-federation/nextjs-mf");
module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    config.output.uniqueName = "next1";
    const mfConf = {
      // mergeRuntime: true, //experimental
      name: "next2",
      library: {
        type: config.output.libraryTarget,
        name: "next2",
      },
      filename: "static/runtime/remoteEntry.js",
      remotes: {
        next1: isServer
          ? path.resolve(
              __dirname,
              "../next1/.next/server/chunks/static/runtime/remoteEntry.js"
            )
          : "next1",
      },
      exposes: {
        "./nav": "./components/nav",
      },
      shared: [
        {
          react: {
            requiredVersion: false,
            eager: true,
          },
        },
      ],
    };
    config.cache = false;
    // withModuleFederation(config, options, mfConf);
    config.experiments = { topLevelAwait: true };

    if (!isServer) {
      config.output.publicPath = "http://localhost:3001/_next/";
      config.plugins.push(new webpack.container.ModuleFederationPlugin(mfConf));
    }

    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
