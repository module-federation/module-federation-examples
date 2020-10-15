const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.experiments = { topLevelAwait: true };

    const mfConf = {
      name: "next2",
      library: { type: config.output.libraryTarget, name: "next2" },
      filename: "static/runtime/remoteEntry.js",
      remotes: {},
      exposes: {
        "./nav": "./components/nav",
      },
    };

    if (!isServer) {
      config.output.publicPath = "http://localhost:3001/_next/";
      config.externals = {
        react: "React",
      };

      Object.assign(mfConf, {
        remotes: {
          next1: "next1",
        },
      });
    } else {
      const { nextServerRemote } = require("../nextFederationUtils");

      const SSRRemotes = nextServerRemote({
        next1: path.resolve(
          __dirname,
          "../next1/.next/server/static/runtime/remoteEntry.js"
        ),
      });

      Object.assign(mfConf, {
        remotes: SSRRemotes,
      });

      config.externals = {
        react: path.resolve(__dirname, "./react.js"),
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
