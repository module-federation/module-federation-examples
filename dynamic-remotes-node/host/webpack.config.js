const { UniversalFederationPlugin } = require('@module-federation/node');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  target: 'async-node',
  externals: [],
  output: {
    publicPath: 'http://localhost:3001/',
    library: { type: 'commonjs-module' },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new UniversalFederationPlugin({
      remoteType: 'script',
      isServer: true,
      name: 'host',
      useRuntimePlugin: true,
      exposes: {
        './noop': './src/noop.js',
      },
    }),
  ],
};
