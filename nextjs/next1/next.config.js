const {
  withFederatedSidecar,
  federationLoader,
} = require("@module-federation/nextjs-mf");
const deps = require("./package.json").dependencies;
module.exports = withFederatedSidecar({
  name: "next1",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./title": "./components/exposedTitle.js",
    "./federatedPage": "./pages/federated",
  },
  shared: {
    react: {
      // Notice shared are NOT eager here.
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
    config.module.rules.push({
      test: /_app.js/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });
    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        remoteType: "var",
        remotes: {
          next2: "next2",
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

    return config;
  },
});
