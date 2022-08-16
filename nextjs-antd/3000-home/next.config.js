const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'home',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            home: 'home@http://localhost:3000/_next/static/chunks/remoteEntry.js',
            shop: 'shop@http://localhost:3001/_next/static/chunks/remoteEntry.js',
            checkout: 'checkout@http://localhost:3002/_next/static/chunks/remoteEntry.js',
          },
          exposes: {
            // pages
            './pages/index': './pages/index.js',
            './pages/home/test-remote-hook': './pages/home/test-remote-hook.js',
            './pages/home/test-shared-nav': './pages/home/test-shared-nav.js',
            // components
            './SharedNav': './components/SharedNav.js',
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
