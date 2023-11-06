const { UniversalFederationPlugin } = require('@module-federation/node');
const path = require('path');

module.exports = {
  cache: false,
  devtool: false,
  entry: './src/main.js',
  mode:'development',
  target: false, // in order to ignore built-in modules like path, fs, etc.
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
    new UniversalFederationPlugin({
      isServer: true,
      name: 'node_host',
      remotes: {
        "node_local_remote": 'commonjs ../../node-local-remote/dist/remoteEntry.js',
        "node_remote": 'node_remote@http://localhost:3002/remoteEntry.js',
      },
      experiments: {},
    })
  ]
};
