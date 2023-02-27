const NextFederationPlugin = require('@module-federation/nextjs-mf');
const {NextMedusaPlugin} = require('@module-federation/dashboard-plugin');
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
    if(!options.isServer) {
      config.plugins.push(
        new NextMedusaPlugin({
          debug:true,
          versionStrategy: `${Date.now()}`,
          filename: 'dashboard.json',
          dashboardURL: `https://api.medusa.codes/update?token=8372db21-6633-4a62-8896-34538c082713`,
          metadata: {
            baseUrl: 'http://localhost:3001/_next/static/chunks/',
            source: {
              url: 'https://github.com/module-federation/federation-dashboard/tree/master/dashboard-example/home',
            },
            remote: 'http://localhost:3001/_next/static/chunks/remoteEntry.js',
          },
        })
      )
    }
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
