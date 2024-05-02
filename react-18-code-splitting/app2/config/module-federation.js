const deps = require('../package.json').dependencies;
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack');

module.exports = {
  client: new ModuleFederationPlugin({
    dts: false,
    name: 'app2',
    filename: 'remoteEntry.js',
    exposes: {
      './Content': './src/client/components/Content',
    },
    remotes: {},
    shared: [{react: deps.react, 'react-dom': deps['react-dom']}],
  }),
  server: [
    new ModuleFederationPlugin({
      remoteType: 'script',
      runtimePlugins: [require.resolve('@module-federation/node/runtimePlugin')],
      name: 'app2',
      library: {type: 'commonjs-module'},
      filename: 'remoteEntry.js',
      exposes: {
        './Content': './src/client/components/Content',
      },
      remotes: {},
      shared: [{react: deps.react, 'react-dom': deps['react-dom']}],
    }),
  ],
};
