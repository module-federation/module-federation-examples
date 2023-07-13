const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const { ModuleFederationPlugin } = webpack.container;
const federationConfig = require('./federationConfig');

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/index.ts'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(federationConfig),
    new FederatedTypesPlugin({
      federationConfig,
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'app1',
      filename: 'index.html',
      chunks: ['main'],
      publicPath: '/',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
};
