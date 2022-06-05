const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  output: {
    publicPath: 'auto',
  },
  devServer: {
    port: 3003,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'store',
      filename: 'remoteEntry.js',
      library: { type: 'global', name: 'store' },
      exposes: {
        './Counter': './src/counter',
      },
      shared: {
        effector: { singleton: true },
        'effector-react': { singleton: true },
      },
    }),
  ],
};
