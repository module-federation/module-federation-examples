const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node');
const FederationStatsPlugin = require('webpack-federation-stats-plugin');

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
    new NodeFederationPlugin({
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
    new StreamingTargetPlugin({
      name: 'app2',
      library: { type: 'commonjs-module' },
      remotes: {},
    }),
  ],
};
