const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const { UniversalFederationPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'expose_jss',
    filename: 'remoteEntry.js',
    remotes: {},
    exposes: {
      './Content': './src/Content',
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
      'react-jss': {
        singleton: true,
      },
    },
  }),
  server: [
    new UniversalFederationPlugin({
      isServer: true,
      useRuntimePlugin: true,
      name: 'expose_jss',
      filename: 'remoteEntry.js',
      library: { type: 'commonjs-module' },
      remotes: {},
      exposes: {
        './Content': './src/Content',
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        'react-jss': { singleton: true },
      },
    }),
  ],
};
