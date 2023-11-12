const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const federationConfig = require('./federationConfig');

const dotenv = require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const initModuleFederationConfig = federationConfig({
  APP1: 'http://localhost:3001',
  APP2: 'http://localhost:3002',
});

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
  output: {
    publicPath: 'auto',
  },
  target: 'web',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': dotenv.parsed,
    }),

    new ModuleFederationPlugin(initModuleFederationConfig),

    new FederatedTypesPlugin({
      federationConfig: initModuleFederationConfig,
    }),

    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'Host App',
      filename: 'index.html',
      chunks: ['main'],
      publicPath: '/',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
};
