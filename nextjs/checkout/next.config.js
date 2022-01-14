const { withFederatedSidecar } = require('@module-federation/nextjs-mf');

module.exports = withFederatedSidecar({
  name: 'checkout',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './title': './components/exposedTitle.js',
    './checkout': './pages/checkout',
    './pages-map': './pages-map.js',
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
    

    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });
    if (options.isServer) {
      Object.assign(config.resolve.alias, {
        checkout: false,
        home: false,
        shop: false,
      });
    } else {
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          remoteType: 'var',
          remotes: {
            home: 'home',
            shop: 'shop',
            checkout: 'checkout',
          },
          shared: {
            "styled-jsx": {
              requiredVersion: false,
              singleton: true,
              eager:true
            },
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
          },
        }),
      );
    }
    return config;
  },
});
