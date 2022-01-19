const { withFederatedSidecar, federationLoader } = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;
let merge = require('webpack-merge');

module.exports = withFederatedSidecar({
  name: 'shop',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './shop': './pages/shop',
    './pdp': './pages/p/[...slug].js',
    './pages-map': './pages-map.js',
  },
  shared: {
    react: {
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  webpack5: true,
  webpack(config, options) {
    const { webpack, isServer } = options;

    config.experiments = { topLevelAwait: true };

    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });

    if (isServer) {
      // ignore it on SSR, realistically you probably wont be SSRing Fmodules, without paid support from @ScriptedAlchemy
      Object.assign(config.resolve.alias, {
        checkout: false,
        home: false,
        shop: false,
      });
    } else {
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          remoteType: 'var',
          remotes: {
            home: 'home',
            shop: 'shop',
            checkout: 'checkout',
          },
          shared: {
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            'styled-jsx': {
              requiredVersion: false,
              singleton: true,
              eager: true,
            },
          },
        }),
      );
    }

    return merge.merge(config, {
      entry() {
        return config.entry().then(entry => {
          return entry;
        });
      },
    });
  },
});
