const {UniversalFederationPlugin} = require('@module-federation/node');
module.exports = {
  entry: './index.js',
  mode: 'development',
  target: false,
  output: {
    library: {type: 'commonjs-module',}
  },
  plugins: [
    new UniversalFederationPlugin({
      isServer: true,
      name: 'app2',
      library: {type: 'commonjs-module',},
      filename: 'remoteEntry.js',
      exposes: {
        './sample': './expose-sample.js',
      }
    }),
  ]
}
