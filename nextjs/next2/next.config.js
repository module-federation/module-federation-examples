const { withFederatedSidecar } = require("@module-federation/nextjs-mf");
const deps = require("./package.json").dependencies;
module.exports = withFederatedSidecar({
  name: "next2",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./nav": "./components/nav.js",
  },
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: deps.next,
      singleton: true,
    },
    "next/dynamic": {
      requiredVersion: deps.next,
      singleton: true,
    },
    "next/link": {
      requiredVersion: deps.next,
      singleton: true,
    },
    "next/head": {
      requiredVersion: deps.next,
      singleton: true,
    },
  },
})({
  future: {
    webpack5: true,
  },
  webpack(config, options) {
    const { webpack, isServer } = options;
    config.experiments = { topLevelAwait: true };
    if (isServer) {
      // ignore it on SSR, realistically you probably wont be SSRing Fmodules
      Object.assign(config.resolve.alias, { next1: false });
    } else {
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          remoteType: "var",
          remotes: {
            next1: "next1",
          },
          shared: {
            react: {
              // Notice shared ARE eager here.
              eager: true,
              singleton: true,
              requiredVersion: false,
            },
          },
        })
      );
    }
    return config;
  },
});
