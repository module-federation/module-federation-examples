const { withFederatedSidecar, federationLoader } = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;
let merge = require('webpack-merge');

module.exports = withFederatedSidecar({
  name: 'shop',
  filename: 'static/chunks/remoteEntry.js',
  remotes: {
    home: 'home@http://localhost:3001/_next/static/chunks/remoteEntry.js',
    shop: 'shop@http://localhost:3002/_next/static/chunks/remoteEntry.js',
    checkout: 'checkout@http://localhost:3000/_next/static/chunks/remoteEntry.js',
  },
  exposes: {
    './shop': './pages/shop',
    './pdp': './pages/p/[...slug].js',
    './pages-map': './pages-map.js',
    './customHook': './components/someHook.js',
  },
  shared: {},
})({
  webpack(config, options) {
    config.experiments = { topLevelAwait: true };

    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });

    return config;
  },
});
