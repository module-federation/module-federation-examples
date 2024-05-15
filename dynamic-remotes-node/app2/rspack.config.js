const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack');
module.exports = {
  entry: './index.js',
  mode: 'development',
  target: 'async-node',
  output: {
    library: {type: 'commonjs-module',}
  },
  plugins: [
    new ModuleFederationPlugin({
      remoteType: 'script',
      isServer: true,
      name: 'app2',
      library: {type: 'commonjs-module',},
      runtimePlugins: [require.resolve('@module-federation/node/runtimePlugin')],
      filename: 'remoteEntry.js',
      exposes: {
        './sample': './expose-sample.js',
      }
    }),
  ]
}
