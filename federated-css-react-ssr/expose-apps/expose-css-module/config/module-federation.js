const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const { UniversalFederationPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'expose_css_module',
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
      'isomorphic-style-loader': {
        singleton: true,
      },
    },
  }),
  server: [
    new UniversalFederationPlugin({
      isServer: true,
      useRuntimePlugin: true,
      name: 'expose_css_module',
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
        'isomorphic-style-loader': { singleton: true },
      },
    }),
  ],
};
