const path = require('path');
const dist = path.resolve(__dirname, 'dist');
const { HtmlRspackPlugin, container: {ModuleFederationPlugin} } = require('@rspack/core');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
          },
          transform: {
            react: {
              runtime: "automatic",
            }
          }
        },
        type: 'javascript/auto',
      },
    ],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: 'auto',
  },
  mode,
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_05',
      filename: 'remoteEntry.js',
      exposes: {
        './ActionButton': './src/components/action-button.ts',
        './AlertBox': './src/components/alert-box.ts',
        './components': './src/index.ts',
      },
      shared: [],
    }),
    new HtmlRspackPlugin({
      title: 'LitHTML Typescript Example',
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
};
