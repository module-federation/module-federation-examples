const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { dependencies } = require('../package.json');

const shared = [
  'react',
  'react-dom',
  'react-router-dom'
];

// console.log(shared.reduce((acc, dep) => ({
//   ...acc,
//   [dep]: {
//     requiredVersion: dependencies[dep],
//     singleton: true
//   }
// })))

module.exports = {
  name: 'dashboard',
  target: 'web',
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index',
  output: {
    path: __dirname + '/dist',
    filename: '[name].[contenthash].js',
    publicPath: 'auto'
  },
  devServer: {
    port: 4001,
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', ['@babel/preset-react', {
            runtime: 'automatic'
          }]]
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App'
      },
      shared: shared.reduce((acc, dep) => ({
        ...acc,
        [dep]: {
          requiredVersion: dependencies[dep],
          singleton: true
        }
      }), {})
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}