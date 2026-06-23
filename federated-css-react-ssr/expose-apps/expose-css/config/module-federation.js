const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const { UniversalFederationPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    experiments: { asyncStartup: true },
    name: 'expose_css',
    filename: 'remoteEntry.js',
    remotes: {},
    exposes: {
      './Content': './src/Content',
      './LoaderContext': './src/LoaderContext',
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
      isServer: true,
      useRuntimePlugin: true,
      name: 'expose_css',
      filename: 'remoteEntry.js',
      library: { type: 'commonjs-module' },
      remotes: {},
      exposes: {
        './Content': './src/Content',
        './LoaderContext': './src/LoaderContext',
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
      },
    }),
  ],
};
