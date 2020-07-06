const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.output.publicPath = "http://localhost:3001/_next/";
      config.output.library = "next2";
    } else {
    }
    config.plugins.push(
      // new webpack.ProvidePlugin({
      //   'global.React': 'react'
      // }),
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

    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
