const deps = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const mfConf = {
      name: "next1",
      library: { type: config.output.libraryTarget, name: "next1" },
      filename: "static/runtime/remoteEntry.js",
      exposes: {
        "./nav": "./components/nav",
        "./exposedTitle": "./components/exposedTitle",
      },
      shared: {},
    };
    if (!isServer) {
      config.output.library = "next1";
      config.output.publicPath = "http://localhost:3000/_next/";
      // Object.assign(mfConf, {
      //   shared: {
      //     react: {
      //       import: "./react.js",
      //       shareKey: "react",
      //       shareScope: "default",
      //       singleton: true,
      //       eager: true,
      //       strictVersion: true,
      //       version: require("react").version,
      //       requiredVersion: require("./package.json").dependencies["react"],
      //     },
      //   },
      // });
    } else {
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
