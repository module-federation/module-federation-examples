const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'home',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            shop: 'shop@http://localhost:3002/_next/static/chunks/remoteEntry.js',
            checkout: 'checkout@http://localhost:3000/_next/static/chunks/remoteEntry.js',
          },
          exposes: {
            './nav': './components/nav.js',
            './home': './pages/index.js',
            './pages-map': './pages-map.js',
          },
          shared: {}
        }),
      );
    }

    return config;
  },
};
