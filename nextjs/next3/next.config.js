const deps = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.output.library = "next3";
      config.output.publicPath = "http://localhost:3002/_next/";
    }

    config.plugins.push(
      new ModuleFederationPlugin({
        name: "next3",
        library: { type: config.output.libraryTarget, name: "next3" },
        filename: "static/runtime/remoteEntry.js",
        remotes: {
          next1: isServer
            ? path.resolve(
                __dirname,
                "../next1/.next/server/static/runtime/remoteEntry.js"
              )
            : "next1",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      })
    );

    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
