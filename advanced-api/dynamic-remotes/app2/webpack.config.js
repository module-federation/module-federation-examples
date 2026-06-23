const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const path = require('path');
const deps = require('./package.json').dependencies;
const { createSharedConfig, createDevServerConfig, babelConfig } = require('../shared-config');
module.exports = {
  entry: './src/index',
  mode: 'development',
  target: 'web',
  devServer: createDevServerConfig(3002),

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
      experiments: { asyncStartup: true },
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget',
      },
      shared: createSharedConfig({
        moment: {
          requiredVersion: deps.moment,
          singleton: false,
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
