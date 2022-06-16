const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  publicPath: 'http://localhost:9001/',
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'other',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'other' },
        exposes: {
          './MainComponent': './src/components/MainComponent',
        },
        shared: require('./package.json').dependencies,
      }),
    ],
  },
  devServer: {
    port: 9001,
  },
};
