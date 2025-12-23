const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const { UniversalFederationPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    experiments: { asyncStartup: true },
      name: 'shell',
    filename: 'container.js',
    remotes: {
      expose_css: 'expose_css@http://localhost:3001/client/remoteEntry.js',
      expose_jss: 'expose_jss@http://localhost:3002/client/remoteEntry.js',
    },
    shared: [
      {
        react: deps.react,
        'react-dom': deps['react-dom'],

        'styled-components': {
          singleton: true,
        },
        'react-jss': {
          singleton: true,
        },
        'isomorphic-style-loader': {
          singleton: true,
        },
      },
    ],
  }),
  server: [
    new UniversalFederationPlugin({
      isServer: true,
      useRuntimePlugin: true,
      name: 'shell',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        expose_css: 'expose_css@http://localhost:3001/server/remoteEntry.js',
        expose_jss: 'expose_jss@http://localhost:3002/server/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        'styled-components': { singleton: true },
        'react-jss': { singleton: true },
        'isomorphic-style-loader': { singleton: true },
      },
    }),
  ],
};
