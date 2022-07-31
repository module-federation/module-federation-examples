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
  shared: {},
})({
  webpack5: true,
  webpack(config, options) {
    config.experiments = { topLevelAwait: true };

    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });

    return config;
  },
});
