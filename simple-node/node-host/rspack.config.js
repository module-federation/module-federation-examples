const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const path = require('path');

module.exports = {
  cache: false,
  devtool: false,
  entry: './src/main.js',
  mode: 'development',
  target: 'async-node',
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
    onAfterSetupMiddleware: function () {
      setTimeout(() => {
        // Require the built server file to boot the Node host after dev middleware emits it.
        require('./dist/server.js');
      }, 3000);
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      remoteType: 'script',
      name: 'node_host',
      shareStrategy: 'loaded-first',
      runtimePlugins: [require.resolve('@module-federation/node/runtimePlugin')],
      remotes: {
        node_local_remote: 'commonjs ../../node-local-remote/dist/remoteEntry.js',
        node_remote: 'node_remote@http://localhost:3002/remoteEntry.js',
      },
    }),
  ],
};
