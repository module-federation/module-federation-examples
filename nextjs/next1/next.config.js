const deps = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
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
      // typically, shared would look something like this
      // https://github.com/webpack/webpack/pull/10960
      // shared: [
      //   {
      //     ...deps,
      //     react: {
      //       singleton: true,
      //       requiredVersion: deps.react,
      //     },
      //     "react-dom": {
      //       singleton: true,
      //       requiredVersion: deps["react-dom"],
      //     },
      //   },
      // ],
    };
    if (!isServer) {
      config.output.library = "next1";
      config.output.publicPath = "http://localhost:3000/_next/";

      // shouldnt have to do this
      config.plugins.push(
        new webpack.ProvidePlugin({
          React: "react",
        })
      );

      // shouldnt have to do this
      Object.assign(config.resolve.alias, {
        react: path.resolve(__dirname, "./react.js"),
      });
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
