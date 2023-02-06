const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
      const { webpack } = options;
      Object.assign(config.experiments, { topLevelAwait: true });
      if (!options.isServer) {
      //config.cache=false
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
            // pages
            './pages/shop/index': './pages/shop/index.js',
            './pages/shop/products/[...slug]': './pages/shop/products/[...slug].js',
            './pages/shop/test-webpack-png': './pages/shop/test-webpack-png.js',
            './pages/shop/test-webpack-svg': './pages/shop/test-webpack-svg.js',
            './pages/shop/exposed-pages': './pages/shop/exposed-pages.js',
            // components
            './useCustomRemoteHook': './components/useCustomRemoteHook.js',
            './WebpackSvg': './components/WebpackSvg.js',
            './WebpackPng': './components/WebpackPng.js',
            // utilities
            './pages/_menu': './pages/_menu.js',
            './pages-map': './pages-map.js',
          },
            shared: {},
            extraOptions: {
                exposePages: true,
                enableImageLoaderFix: true,
                enableUrlLoaderFix: true,
            },
        }),
      );
    }
    return config;
  },
};
