const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
  lintOnSave: false,
  publicPath: 'http://localhost:9000/',
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        experiments: { asyncStartup: true },
      name: 'core',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'core' },
        exposes: {
          './Button': './src/components/Button',
          './Section': './src/components/Section',
        },
        shared: require('./package.json').dependencies,
      }),
    ],
  },
  devServer: {
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
