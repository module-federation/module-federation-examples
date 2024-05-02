const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

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
    new ModuleFederationPlugin({
      remoteType: 'script',
      name: 'shell',
      runtimePlugins: [
        require.resolve('@module-federation/node/runtimePlugin')
      ],
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        remote1: 'remote1@http://localhost:3001/server/remoteEntry.js',
      },
      shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
    }),
  ],
};
