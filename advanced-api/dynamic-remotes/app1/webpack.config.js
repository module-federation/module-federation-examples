const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const path = require('path');
const { createSharedConfig, createDevServerConfig, babelConfig } = require('../shared-config');

module.exports = {
  entry: './src/index',
  mode: 'development',
  target: 'web',
  devServer: createDevServerConfig(3001),
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
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
      name: 'app1',
      shareStrategy: 'loaded-first',
      // adds react as shared module
      // version is inferred from package.json
      // there is no version check for the required version
      // so it will always use the higher version found
      shared: createSharedConfig(),
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
