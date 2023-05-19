const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node');

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
    new NodeFederationPlugin({
      name: 'shell',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        remote1: 'remote1@http://localhost:3001/server/remoteEntry.js',
      },
      shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
    }),
    new StreamingTargetPlugin({
      name: 'shell',
      library: { type: 'commonjs-module' },
      remotes: {
        remote1: 'remote1@http://localhost:3001/server/remoteEntry.js',
      },
    }),
  ],
};
