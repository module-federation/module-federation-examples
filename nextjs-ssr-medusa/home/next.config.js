const NextFederationPlugin = require('@module-federation/nextjs-mf');
const {NextMedusaPlugin} = require('@module-federation/dashboard-plugin');
const {createDelegatedModule} = require('@module-federation/utilities');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    home: createDelegatedModule(require.resolve('./medusa-delegate.js'), {
      remote: `home`,
      token: '8372db21-6633-4a62-8896-34538c082713',
      env: "development"
    }),
    shop: createDelegatedModule(require.resolve('./medusa-delegate.js'), {
      remote: `shop`,
      token: '8372db21-6633-4a62-8896-34538c082713',
      env: "development"
    }),
    checkout: `checkout@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
  };
};
const timestamp = Date.now();
module.exports = {
  webpack5: true,
  webpack(config, options) {
    config.plugins.push(
      new NextMedusaPlugin({
        debug:true,
        versionStrategy: timestamp,
        filename: 'dashboard.json',
        dashboardURL: `https://api.medusa.codes/update?token=8372db21-6633-4a62-8896-34538c082713`,
        metadata: {
          baseUrl: 'http://localhost:3001/_next/static/chunks/',
          source: {
            url: 'https://github.com/module-federation/federation-dashboard/tree/master/dashboard-example/home',
          },
          remote: 'http://localhost:3001/_next/static/chunks/remoteEntry.js',
        },
      }),
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
        },
        // medusa: (!options.isServer && !options.dev) ? new DashboardPlugin({
        //   debug:true,
        //   versionStrategy: `${Date.now()}`,
        //   filename: 'dashboard.json',
        //   dashboardURL: `https://api.medusa.codes/update?token=8372db21-6633-4a62-8896-34538c082713`,
        //   metadata: {
        //     baseUrl: 'http://localhost:3001/_next/static/chunks/',
        //     source: {
        //       url: 'https://github.com/module-federation/federation-dashboard/tree/master/dashboard-example/home',
        //     },
        //     remote: 'http://localhost:3001/_next/static/chunks/remoteEntry.js',
        //   },
        // }) : null,
      }),
    );

    return config;
  },
};
