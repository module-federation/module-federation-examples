const deps = require('../package.json').dependencies;
const { UniversalFederationPlugin } = require('@module-federation/node');
const {ModuleFederationPlugin} = require('@module-federation/enhanced')
const FederationStatsPlugin = require('webpack-federation-stats-plugin');


module.exports = {
  client: [
    // new FederationStatsPlugin(),
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@http://localhost:3001/static/remoteEntry.js',
      },
      shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
    }),
  ],
  server: [
    new UniversalFederationPlugin({
      isServer: true,
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@http://localhost:3001/server/remoteEntry.js',
      },
      exposes: {},
      shared: [
        {
          react: { requiredVersion: deps.react, eager: true },
          'react-dom': { requiredVersion: deps['react-dom'], eager: true },
        },
      ],
    }),
  ],
};
