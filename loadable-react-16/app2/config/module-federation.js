const deps = require('../package.json').dependencies;
const { UniversalFederationPlugin } = require('@module-federation/node');
const {ModuleFederationPlugin} = require('@module-federation/enhanced')

const FederationStatsPlugin = require('webpack-federation-stats-plugin');
ModuleFederationPlugin.constructor.name = 'ModuleFederationPlugin'
module.exports = {
  client: [
    new FederationStatsPlugin(),
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './Content': './src/client/components/Content',
      },
      remotes: {},
      shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
    }),
  ],
  server: [
    new UniversalFederationPlugin({
      isServer: true,
      name: 'app2',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      exposes: {
        './Content': './src/client/components/Content',
      },
      remotes: {},
      shared: [
        { react: { requiredVersion: deps.react, eager: true }, 'react-dom': deps['react-dom'] },
      ],
    }),
  ],
};
