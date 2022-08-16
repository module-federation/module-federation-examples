const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'checkout',
          remotes: {
            home: `home@http://localhost:3000/_next/static/chunks/remoteEntry.js`,
            shop: 'shop@http://localhost:3001/_next/static/chunks/remoteEntry.js',
            checkout: 'checkout@http://localhost:3002/_next/static/chunks/remoteEntry.js',
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            // pages
            './pages/checkout/index': './pages/checkout/index.js',
            './pages/checkout/test-check-button': './pages/checkout/test-check-button.js',
            './pages/checkout/test-title': './pages/checkout/test-title.js',
            // components
            './CheckoutTitle': './components/CheckoutTitle.js',
            './ButtonOldAnt': './components/ButtonOldAnt.js',
            // utilities
            './menu': './pages/_menu.js',
            './pages-map': './pages-map.js',
          },
          shared: {},
        }),
      );
    }

    return config;
  },
};
