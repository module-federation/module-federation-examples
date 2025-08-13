const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('@module-federation/enhanced').ModuleFederationPlugin;
const path = require('path');
const deps = require('./package.json').dependencies;
const { createSharedConfig, createDevServerConfig, babelConfig } = require('../shared-config');
module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: createDevServerConfig(3003),
  target: 'web',
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: babelConfig,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app3',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget',
      },
      shared: createSharedConfig({
        moment: {
          requiredVersion: deps.moment,
          singleton: false,
        },
        'react-redux': {
          requiredVersion: deps['react-redux'],
          singleton: true,
        },
        redux: {
          requiredVersion: deps.redux,
          singleton: true,
        },
      }),
      dts: {
        generateTypes: true,
        generateAPITypes: true,
      },
      manifest: {
        fileName: 'mf-manifest.json',
        getPublicPath: () => 'auto',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
