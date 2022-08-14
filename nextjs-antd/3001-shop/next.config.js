const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'shop',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            home: 'home@http://localhost:3000/_next/static/chunks/remoteEntry.js',
            shop: 'shop@http://localhost:3001/_next/static/chunks/remoteEntry.js',
            checkout: 'checkout@http://localhost:3002/_next/static/chunks/remoteEntry.js',
          },
          exposes: {
            './shop': './pages/shop',
            './pdp': './pages/p/[...slug].js',
            './menu': './pages/_menu.js',
            './pages-map': './pages-map.js',
            './useCustomRemoteHook': './components/useCustomRemoteHook.js',
          },
        }),
      );
    }
    return config;
  },
};
