const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'app1',
    filename: 'remoteEntry.js',
    remotes: {
      app2: 'app2@http://localhost:3001/static/remoteEntry.js',
    },
    shared: [
      {
        react: {requiredVersion: deps.react, eager: true},
        'react-dom': deps['react-dom'],
        graphql: {requiredVersion: deps.graphql, eager: true},
        '@apollo/client': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@apollo/client'],
        },
        'node-fetch': deps['node-fetch'],
        'serialize-javascript': deps['serialize-javascript'],
      },
    ],
  }),
  server: [
    new NodeFederationPlugin({
      name: 'app1',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@http://localhost:3001/server/remoteEntry.js',
      },
      shared: [
        {
          react: {requiredVersion: deps.react, eager: true},
          'react-dom': deps['react-dom'],
          graphql: {requiredVersion: deps.graphql, eager: true},
          '@apollo/client': {
            eager: true,
            singleton: true,
            requiredVersion: deps['@apollo/client'],
          },
          'node-fetch': deps['node-fetch'],
          'serialize-javascript': deps['serialize-javascript'],
        },
      ],
    }),
    new StreamingTargetPlugin({
      name: 'app1',
      library: { type: 'commonjs-module' },
      remotes: {
        app2: 'app2@http://localhost:3001/server/remoteEntry.js',
      },
    }),
  ],
};
