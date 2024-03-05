const deps = require('../package.json').dependencies;
const { UniversalFederationPlugin } = require('@module-federation/node');

module.exports = {
  client: new UniversalFederationPlugin({
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
    new UniversalFederationPlugin({
      isServer:true,
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
    })
  ],
};
