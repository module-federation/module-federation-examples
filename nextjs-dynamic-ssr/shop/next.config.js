const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shop',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './shop': './pages/shop.js',
          './pdp': './pages/p/[...slug].js',
          './pages-map': './pages-map.js',
        },
        shared: {},
        extraOptions:{
          exposePages: true
        }
      }),
    );

    return config;
  },
};
