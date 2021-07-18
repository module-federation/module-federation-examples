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
      requiredVersion: false,
      singleton: true,
      import: false,
    },
  },
})({
  webpack5: true,
  webpack(config, options) {
    const { webpack } = options;
    config.experiments = { topLevelAwait: true };
    config.module.rules.push({
      test: /next-dev.js/,
      loader: "@module-federation/nextjs-mf/lib/client-loader.js",
    });
    config.module.rules.push({
      test: /_app.js/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });
    Object.assign(config.output, {
      publicPath: "auto",
    });
    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        shared: {
          "@module-federation/nextjs-mf/lib/noop": {
            eager: false,
          },
        },
      })
    );

    return config;
  },
});
