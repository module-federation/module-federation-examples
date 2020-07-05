const { moduleFederationPlugin } = require("./withModuleFederation");
const deps = require("./package.json").dependencies;
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    const W5Plugins = config.plugins.filter((plugin) => {
      // not currently supported in Webpack 5
      return plugin.constructor.name !== "ReactFreshWebpackPlugin";
    });
    config.output.library = "next1";

    if (!isServer) {
      config.output.publicPath = "http://localhost:3000/_next/";
      config.experiments = {
        importAsync: true,
      };
      //
      //   config.externals = {
      //     "react":
      //       "promise new Promise(resolve => {\n" +
      //       "      var findScope = setInterval(()=>{\n" +
      //       "        if(window.next1 && window.next1.get) {\n" +
      //       "          resolve(window.next1.get('./reactRexport').then(Module => {\n" +
      //       "            return Module\n" +
      //       "          }))\n" +
      //       "          clearInterval(findScope)\n" +
      //       "        }\n" +
      //       "      },100)\n" +
      //       "    })",
      //   }
    }
    //http://localhost:3000/_next/static/chunks/components_exposedTitle_js.js
    //http://localhost:3000/_static/chunks/components_exposedTitle_js.js
    const ModuleFederationPlugin = moduleFederationPlugin(webpack);
    W5Plugins.push(
      new ModuleFederationPlugin({
        name: "next1",
        library: { type: config.output.libraryTarget, name: "next1" },
        filename: "static/runtime/remoteEntry.js",
        exposes: {
          "./nav": "./components/nav",
          "./exposedTitle": "./components/exposedTitle",
          "./react": "react",
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
