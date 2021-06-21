const { withFederatedSidecar } = require("@module-federation/nextjs-mf");

module.exports = withFederatedSidecar({
  name: "next2",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./nav": "./components/nav.js",
  },
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: false,
      singleton: true,
    },
    "next/dynamic": {
      requiredVersion: false,
      singleton: true,
    },
    "next/link": {
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  future: {
    webpack5: true,
  },
  webpack(config, options) {
    const { webpack } = options;
    config.experiments = { topLevelAwait: true };

    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        // remoteType: "var",
        // remotes: {
        //   next1: "next1",
        // },
        shared: {
          react: {
            // Notice shared ARE eager here.
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
          "next/dynamic": {
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
          "next/link": {
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
          "next/head": {
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
});
