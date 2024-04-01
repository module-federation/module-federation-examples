const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const { UniversalFederationPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'shell',
    filename: 'container.js',
    remotes: {
      remote1: 'remote1@http://localhost:3001/client/remoteEntry.js',
    },
    shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
  }),
  server: [
    new UniversalFederationPlugin({
      remoteType: 'script',
      name: 'shell',
      isServer: true,
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        remote1: 'remote1@http://localhost:3001/server/remoteEntry.js',
      },
      shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
    }),
  ],
};
