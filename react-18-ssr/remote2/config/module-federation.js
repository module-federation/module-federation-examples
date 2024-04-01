const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const {UniversalFederationPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'remote2',
    filename: 'remoteEntry.js',
    remotes: {},
    exposes: {
      './Image': './src/Image',
    },
    shared: {
      ...deps,
      react: {
        singleton: true,
        requiredVersion: deps.react,
      },
      'react-dom': {
        singleton: true,
        requiredVersion: deps['react-dom'],
      },
    },
  }),
  server: [
    new UniversalFederationPlugin({
      remoteType: 'script',
      name: 'remote2',
      isServer: true,
      filename: 'remoteEntry.js',
      library: { type: 'commonjs-module' },
      remotes: {},
      exposes: {
        './Image': './src/Image',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ],
};
