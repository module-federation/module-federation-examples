const {
  withFederatedSidecar,
  federationLoader,
} = require("@module-federation/nextjs-mf");
const deps = require("./package.json").dependencies;
let merge = require("webpack-merge");

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
    },
  },
})({
  webpack5: true,
  webpack(config, options) {
    const { webpack } = options;

    config.experiments = { topLevelAwait: true };
    config.output.publicPath = "auto";
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
          react: {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
        },
      })
    );

    return merge.merge(config, {
      entry() {
        return config.entry().then((entry) => {
          return entry;
        });
      },
    });
  },
});
