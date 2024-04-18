const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');

module.exports = {
  cache: false,
  devtool: false,
  entry: './src/main.js',
  mode:'development',
  target: 'async-node', // in order to ignore built-in modules like path, fs, etc.
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  module: {
    rules: [],
  },
  devServer: {
    port: 3000,
    devMiddleware: {
      writeToDisk: true,
    },
    onAfterSetupMiddleware: function() {
      setTimeout(() => {
        const app = require('./dist/server.js');
      }, 3000);
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      remoteType: 'script',
      name: 'node_host',
      runtimePlugins: [require.resolve('@module-federation/node/runtimePlugin')],
      remotes: {
        "node_local_remote": 'commonjs ../../node-local-remote/dist/remoteEntry.js',
        "node_remote": 'node_remote@http://localhost:3002/remoteEntry.js',
      },
    })
  ]
};
