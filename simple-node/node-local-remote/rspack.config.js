const path = require('path');
const { container:{ModuleFederationPlugin} } = require('@rspack/core');

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
      isServer: true,
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
