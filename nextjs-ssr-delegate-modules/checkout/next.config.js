const NextFederationPlugin = require('@module-federation/nextjs-mf');
const {createDelegatedModule} = require('@module-federation/utilities');

const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    home: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `home@http://localhost:3001/_next/static/${location}/remoteEntry.js`
    }),
    shop: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`
    }),
    checkout: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `checkout@http://localhost:3000/_next/static/${location}/remoteEntry.js`
    }),
    // home: `home@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    // shop: `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    // checkout: `checkout@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
  };
};

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
        remotes: remotes(options.isServer),
        extraOptions:{
          automaticAsyncBoundary: true
        }
      }),
    );

    return config;
  },
};
