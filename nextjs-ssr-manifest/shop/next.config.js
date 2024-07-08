const NextFederationPlugin = require('@module-federation/nextjs-mf');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    home: `home@http://localhost:3001/_next/static/${location}/mf-manifest.json`,
    checkout: `checkout@http://localhost:3000/_next/static/${location}/mf-manifest.json`,
  };
};
module.exports = {
  headers() {
    return [
      {
        source: '/_next/static/chunks/mf-manifest.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      }
    ]
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shop',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './shop': './pages/shop.js',
          './pdp': './pages/p/[...slug].js',
          './pages-map': './pages-map.js',
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      }),
    );

    return config;
  },
};
