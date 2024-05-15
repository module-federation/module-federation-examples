const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack');
module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    library: {type: 'commonjs-module',}
  },
  target: 'async-node',
  plugins: [
    new ModuleFederationPlugin({
      remoteType: 'script',
      name: 'app1',
      runtimePlugins: [require.resolve('@module-federation/node/runtimePlugin')],
      exposes: {
        './noop': './noop.js',
      }
    }),
  ]
}
