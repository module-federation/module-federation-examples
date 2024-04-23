const path = require('path');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'auto',
  },
  target: 'async-node',
  devtool: false,
  cache: false,
  devServer: {
    port: 3001,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'node_local_remote',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      exposes: {
        './test': './src/expose.js',
      },
      runtimePlugins: [require.resolve('@module-federation/node/runtimePlugin')],
    })
  ]
};
