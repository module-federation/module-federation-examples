const path = require("path");
const {
  MergeRuntime,
  withModuleFederation,
} = require("@module-federation/nextjs-mf");
const RuntimePlugin = require("./NextRuntimePlugin");
module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    if (!options.isServer) {
      // config.output.library = 'next1'
    }
    // config.output.uniqueName = '_N_E_1'
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      // mergeRuntime: true, //experimental
      name: "next1",
      filename: "static/chunks/remoteEntry.js",
      // library: {
      //   type: 'var',
      //   name: "next1",
      // },
      exposes: {
        "./exposedTitle": "./components/exposedTitle",
        // "./federatedPage": "./pages/federated",
      },
      shared: [
        {
          react: {
            requiredVersion: false,
            eager: true,
          },
        },
      ],
      remotes: {
        next2: isServer
          ? path.resolve(
              __dirname,
              "../next2/.next/server/chunks/static/runtime/remoteEntry.js"
            )
          : "next2",
      },
    };
    config.cache = false;
    config.experiments = { topLevelAwait: true };
    // config.output.uniqueName = 'next1'
    if (!isServer) {
      // console.log(require('util').inspect(config))

      config.output.publicPath = "http://localhost:3000/_next/";
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin(mfConf),
        new RuntimePlugin()
      );
    }

    // withModuleFederation(config, options, mfConf);
    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
