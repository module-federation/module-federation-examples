const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'app2',
    filename: 'remoteEntry.js',
    exposes: {
      './PokemonList': './src/client/components/PokemonList',
    },
    remotes: {},
    shared: [
      {
        react: deps.react,
        'react-dom': deps['react-dom'],
        graphql: deps.graphql,
        '@apollo/client': {
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
      name: 'app2',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      exposes: {
        './PokemonList': './src/client/components/PokemonList',
      },
      remotes: {},
      shared: [
        {
          react: deps.react,
          'react-dom': deps['react-dom'],
          graphql: deps.graphql,
          '@apollo/client': {
            singleton: true,
            requiredVersion: deps['@apollo/client'],
          },
          'node-fetch': deps['node-fetch'],
          'serialize-javascript': deps['serialize-javascript'],
        },
      ],
    }),
    new StreamingTargetPlugin({
      name: 'app2',
      library: { type: 'commonjs-module' },
      remotes: {},
    }),
  ],
};
