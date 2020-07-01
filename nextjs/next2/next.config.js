const { moduleFederationPlugin } = require("./withModuleFederation");
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    const W5Plugins = config.plugins.filter((plugin) => {
      // not currently supported in Webpack 5
      return plugin.constructor.name !== "ReactFreshWebpackPlugin";
    });
    if (!isServer) {
      config.output.publicPath = "http://localhost:3001/_next/";
      config.output.library = "next2";
      config.experiments = {
        importAsync: true,
      };

      // config.externals = {
      //   "react":
      //     "script http://   new Promise(resolve => {\n" +
      //     "      var findScope = setInterval(()=>{\n" +
      //     "        if(window.next1 && window.next1.get) {\n" +
      //     "          resolve(window.next1.get('./reactRexport').then(Module => {\n" +
      //     "            return Module\n" +
      //     "          }))\n" +
      //     "          clearInterval(findScope)\n" +
      //     "        }\n" +
      //     "      },100)\n" +
      //     "    })",
      // }
    } else {
      // config.target = "async-node";
    }

    // console.log('ZACK')
    // console.log(require('../next1/.next/server/static/runtime/remoteEntry.js'))
    // console.log('ZACK')
    const ModuleFederationPlugin = moduleFederationPlugin(webpack);
    W5Plugins.push(
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
        shared: {
          reactRexport: {
            import: "react",
            shareKey: "react",
            shareScope: "default",
            singleton: true,
            eager: true,
            // strictVersion: true, // don't use shared version when version isn't valid. Singleton or modules without fallback will throw, otherwise fallback is used
            version: require("react").version,
            requiredVersion: require("./package.json").dependencies["react"],
          },
        },
      })
    );

    config.plugins = W5Plugins;
    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
