const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');
module.exports = {
  entry: './index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3000/',
    clean: true,
  },
  module: {},
  cache: false,
  plugins: [
    new ModuleFederationPlugin({
      name: 'lib_app',
      filename: 'remoteEntry.js',
      exposes: {
        './react': 'react',
        './react-dom': 'react-dom',
      },
    }),
  ],
};
