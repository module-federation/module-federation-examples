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
            './CheckoutTitle': './components/CheckoutTitle.js',
            './checkout': './pages/checkout.js',
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
