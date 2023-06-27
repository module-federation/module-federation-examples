const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  publicPath: 'http://localhost:8080/',
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
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
