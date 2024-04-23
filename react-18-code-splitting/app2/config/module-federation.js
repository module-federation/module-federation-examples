const deps = require('../package.json').dependencies;
const {ModuleFederationPlugin} = require('@module-federation/enhanced');
const {UniversalFederationPlugin} = require('@module-federation/node');

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
    new UniversalFederationPlugin({
      dts: false,
      remoteType: 'script',
      isServer: true,
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
