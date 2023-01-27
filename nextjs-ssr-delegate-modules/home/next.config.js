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
  webpack5: true,
  webpack(config, options) {
    config.cache = false

    config.plugins.push(
      new NextFederationPlugin({
        name: 'home',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './nav': './components/nav.js',
          './home': './pages/index.js',
          './pages-map': './pages-map.js',
        },
        remotes: remotes(options.isServer),
        shared: {
          lodash: {}
        },
        extraOptions:{
          automaticAsyncBoundary: true
        }
      }),
    );

    return config;
  },
};
