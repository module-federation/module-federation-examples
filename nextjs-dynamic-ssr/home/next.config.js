const NextFederationPlugin = require('@module-federation/nextjs-mf');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR

module.exports = {
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
        shared: {},
        extraOptions:{

          exposePages: true
        }
      }),
    );

    return config;
  },
};
