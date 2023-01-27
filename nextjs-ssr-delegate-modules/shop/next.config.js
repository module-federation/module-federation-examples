const NextFederationPlugin = require('@module-federation/nextjs-mf');
const {createDelegatedModule} = require('@module-federation/utilities');
const remotes = isServer => {
  return {
    checkout: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `checkout@http://localhost:3000/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
    }),
    shop: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `shop@http://localhost:3002/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
    }),
    home: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `home@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
    }),
  };
};
module.exports = {
  webpack(config, options) {
    config.cache = false
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shop',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './shop': './pages/shop.js',
          './pdp': './pages/p/[...slug].js',
          './pages-map': './pages-map.js',
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions:{
          automaticAsyncBoundary: true
        }
      }),
    );

    return config;
  },
};
