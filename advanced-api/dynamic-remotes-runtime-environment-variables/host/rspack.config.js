const {
  HtmlRspackPlugin,
  container: { ModuleFederationPlugin },
} = require('@rspack/core');
const CopyPlugin = require('copy-webpack-plugin');
const deps = require('./package.json').dependencies;
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index',
  devtool: 'source-map',
  devServer:{
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'builtin:swc-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public/env-config.json', to: 'env-config.json' }],
    }),
    new ModuleFederationPlugin({
      name: 'host',
      shared: {
        ...deps,
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
};
