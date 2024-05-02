const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'remote1',
    filename: 'remoteEntry.js',
    remotes: {
      remote2: 'remote2@http://localhost:3002/client/remoteEntry.js',
    },
    exposes: {
      './Content': './src/Content',
    },
    shared: {
      ...deps,
      react: {
        singleton: true,
        requiredVersion: deps.react,
      },
      'react-dom': {
        singleton: true,
        requiredVersion: deps['react-dom'],
      },
    },
  }),
  server: [
    new ModuleFederationPlugin({
      runtimePlugins: [require.resolve('@module-federation/node/runtimePlugin')],
      remoteType: 'script',
      name: 'remote1',
      filename: 'remoteEntry.js',
      library: { type: 'commonjs-module' },
      remotes: {
        remote2: 'remote2@http://localhost:3002/server/remoteEntry.js',
      },
      exposes: {
        './Content': './src/Content',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    })
  ],
};
