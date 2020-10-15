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
      shared: {
        "shared-react": {
          import: "./react",
          shareKey: "react",
          packageName: "react",
          singleton: true,
        },
      },
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
      config.output.publicPath = "http://localhost:3001/_next/";
      config.externals = {
        react: "React",
      };
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
      // should use remotes, but async issues on server. Manually implementing what webpack would do
      // the manual implementation is in components/LazyHydration
      // Object.assign(mfConf, {
      //   remotes: {
      //     next1: path.resolve(
      //       __dirname,
      //       "../next1/.next/server/static/runtime/remoteEntry.js"
      //     ),
      //   },
      // });
      const rpat = path.resolve(
        __dirname,
        "../next1/.next/server/static/runtime/remoteEntry.js"
      );
      Object.assign(mfConf, {
        remotes: {
          next1: {
            external: `external new Promise((res)=>{
          
        const mode = require('${rpat}')
        const proxy = {get:(request)=> {console.log(request); return mode.next1.get(request)}, init:(scope)=>{try {mode.next1.init(scope)} catch(e){console.log('already initialized')}}}
        res(proxy)
          })`,
          },
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
