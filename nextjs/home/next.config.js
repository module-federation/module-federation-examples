const { withFederatedSidecar } = require('@module-federation/nextjs-mf');
module.exports = withFederatedSidecar({
  name: 'home',
  filename: 'static/chunks/remoteEntry.js',
  remotes: {
    home: 'home@http://localhost:3001/_next/static/chunks/remoteEntry.js',
    shop: 'shop@http://localhost:3002/_next/static/chunks/remoteEntry.js',
    checkout: 'checkout@http://localhost:3000/_next/static/chunks/remoteEntry.js',
  },
  exposes: {
    './nav': './components/nav.js',
    './home': './pages/index.js',
    './pages-map': './pages-map.js',
  },
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  webpack5: true,
  webpack(config, options) {
    const { webpack, isServer } = options;
    config.experiments = { topLevelAwait: true };

    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });

    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        remotes: {
          home: 'home@http://localhost:3001/_next/static/chunks/remoteEntry.js',
          shop: 'shop@http://localhost:3002/_next/static/chunks/remoteEntry.js',
          checkout: 'checkout@http://localhost:3000/_next/static/chunks/remoteEntry.js',
        },
        shared: {
          'styled-jsx': {
            requiredVersion: false,
            singleton: true,
            eager: true,
          },
          react: {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
        },
      }),
    );
    return config;
  },
});
