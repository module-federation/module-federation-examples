const NextFederationPlugin = require('@module-federation/nextjs-mf');
const DashboardPlugin = require('@module-federation/dashboard-plugin');
const {NextMedusaPlugin} = require("@module-federation/dashboard-plugin");
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
const timestamp = Date.now();
module.exports = {
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
        name: 'checkout',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './title': './components/exposedTitle.js',
          './checkout': './pages/checkout.js',
          './pages-map': './pages-map.js',
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions:{
          automaticAsyncBoundary: true
        },
      }),
    );

    return config;
  },
};
