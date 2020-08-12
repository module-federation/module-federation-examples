const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const mfConf = {
      name: "next2",
      library: { type: config.output.libraryTarget, name: "next2" },
      filename: "static/runtime/remoteEntry.js",
      exposes: {
        "./nav": "./components/nav",
        "./exposedTitle": "./components/exposedTitle",
      },
      // shared: {},
      // typically, shared would look something like this
      // https://github.com/webpack/webpack/pull/10960
      shared: [
        {
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      ],
    };

    if (!isServer) {
      config.output.library = "next2";
      config.output.publicPath = "http://localhost:3000/_next/";
      config.optimization.runtimeChunk = undefined;

      // shouldnt have to do this
      // config.plugins.push(
      //   new webpack.ProvidePlugin({
      //     React: "react",
      //   })
      // );
      // shouldnt have to do this
      // Object.assign(config.resolve.alias, {
      //   react: path.resolve(__dirname, "./react.js"),
      // });

      Object.assign(mfConf, {
        remotes: {
          next1: "next1",
        },
      });
    } else {
      // is server
      Object.assign(mfConf, {
        shared: {},
        remotes: {
          next1: path.resolve(
            __dirname,
            "../next1/.next/server/static/runtime/remoteEntry.js"
          ),
        },
      });

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
