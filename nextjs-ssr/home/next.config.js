const NextFederationPlugin = require('@module-federation/nextjs-mf');
const path = require('path');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR

const remotes = (isServer,output) => {
  const location = isServer ? 'ssr' : 'chunks';

  return {
    // shop: `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    shop: isServer ? path.relative(output,'../shop/.next/static/ssr/remoteEntry.js'): `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    checkout: isServer ? path.relative(output,'../checkout/.next/static/ssr/remoteEntry.js'): `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    // checkout: `checkout@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
    // checkout: '../checkout/.next/static/ssr/remoteEntry.js',
  };
};
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
        remotes: remotes(options.isServer, config.output.path),
        shared: {},
        extraOptions:{

          exposePages: true
        }
      }),
    );

    return config;
  },
};
