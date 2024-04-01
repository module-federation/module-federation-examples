const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@rspack/core').container;
const path = require('path');
const mfConfig = require('./mf-plugin.config');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3004,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'builtin:swc-loader',
        exclude: /node_modules/,
        options: {
          jsc: {
            parser: {
              syntax: 'ecmascript',
              jsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(mfConfig),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
