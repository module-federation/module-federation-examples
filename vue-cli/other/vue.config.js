const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
  lintOnSave: false,
  publicPath: 'http://localhost:9001/',
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        experiments: { asyncStartup: true },
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
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
