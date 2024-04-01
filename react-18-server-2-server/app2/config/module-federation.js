const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const { UniversalFederationPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'app2',
    filename: 'remoteEntry.js',
    exposes: {
      './Content': './src/client/components/Content',
    },
    remotes: {},
    shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
  }),
  server: [
    new UniversalFederationPlugin({
      isServer: true,
      name: 'app2',
      library: { type: 'commonjs-module' },
      remoteType: 'script',
      filename: 'remoteEntry.js',
      exposes: {
        './Content': './src/client/components/Content',
        './userRoute': './src/server/routes/user',
      },
      remotes: {},
      shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
    })
  ],
};
