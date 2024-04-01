const NextFederationPlugin = require('@module-federation/nextjs-mf');
module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'checkout',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './title': './components/exposedTitle.js',
          './checkout': './pages/checkout.js',
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
