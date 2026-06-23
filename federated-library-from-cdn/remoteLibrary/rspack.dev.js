const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const common = require('./webpack.common.js');
delete common.plugins;
module.exports = merge(common, {
  mode: 'development',
  entry: './src',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      name: 'remoteLibrary',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/button.jsx',
      },
    }),
  ],
  devServer: {
    port: 3003,
    hot: true,
    compress: true,
    watchFiles: ['src/**/*'],
  },
});
