const NextFederationPlugin = require('@module-federation/nextjs-mf');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    home: `home@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    shop: `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    checkout: `checkout@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
  };
};
module.exports = {
  webpack5: true,
  webpack(config, options) {
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
        shared: {},
        extraOptions:{
          automaticAsyncBoundary: true
        }
      }),
    );

    return config;
  },
};
