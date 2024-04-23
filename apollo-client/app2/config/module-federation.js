const deps = require('../package.json').dependencies;

module.exports = (FederationPlugin) => {
  return {
    client: new FederationPlugin({
      remoteType: 'script',
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
      new FederationPlugin({
        remoteType: 'script',
        isServer: true,
        runtimePlugins:[require.resolve('@module-federation/node/runtimePlugin')],
        name: 'app2',
        library: {type: 'commonjs-module'},
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
  }
};
