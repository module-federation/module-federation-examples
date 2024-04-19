const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const rspack = require('@rspack/core')

module.exports = (FederationPlugin)=> {
//   let FederationPlugin;
//   if(type === 'rspack') {
// FederationPlugin = rspack.container.ModuleFederationPlugin
//   } else if(type === 'uni')
  return {
  client: new FederationPlugin({
    remoteType: 'script',
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
    server
:
  [
    new FederationPlugin({
      remoteType: 'script',
      isServer: true,
      name: 'app1',
      library: {type: 'commonjs-module'},
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@http://localhost:3001/server/remoteEntry.js',
      },
      runtimePlugins: [require.resolve('@module-federation/node/runtimePlugin')],
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
  ]
}
}
