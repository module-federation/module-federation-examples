const { withFederatedSidecar } = require('@module-federation/nextjs-mf');

module.exports = withFederatedSidecar({
  name: 'checkout',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './title': './components/exposedTitle.js',
    './checkout': './pages/checkout',
    './pages-map': './pages-map.js',
  },
  remotes: {
    home: 'home@http://localhost:3001/_next/static/chunks/remoteEntry.js',
    shop: 'shop@http://localhost:3002/_next/static/chunks/remoteEntry.js',
    checkout: 'checkout@http://localhost:3000/_next/static/chunks/remoteEntry.js',
  },
  shared: {},
})({
  webpack(config, options) {
    const { webpack } = options;

    config.experiments = { topLevelAwait: true };

    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });

    return config;
  },
});
