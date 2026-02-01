const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
  lintOnSave: false,
  publicPath: 'http://localhost:8080/',
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        experiments: { asyncStartup: true },
      name: 'consumer',
        filename: 'remoteEntry.js',
        remotes: {
          core: 'core@http://localhost:9000/remoteEntry.js',
          other: 'other@http://localhost:9001/remoteEntry.js',
        },
        shared: require('./package.json').dependencies,
      }),
    ],
  },
};
