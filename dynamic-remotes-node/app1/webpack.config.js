const {UniversalFederationPlugin} = require('@module-federation/node');
module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    library: {type: 'commonjs-module',}
  },
  target: false,
  plugins: [
    new UniversalFederationPlugin({
      remoteType: 'script',
      isServer: true,
      name: 'app1',
      exposes: {
        './noop': './noop.js',
      }
    }),
  ]
}
