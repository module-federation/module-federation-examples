const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { dependencies } = require('../package.json');

const shared = [
  'react',
  'react-dom',
  'react-router-dom'
];

module.exports = {
  name: 'container',
  target: 'web',
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index',
  output: {
    path: __dirname + '/dist',
    filename: '[name].[contenthash].js',
    publicPath: 'auto'
  },
  devServer: {
    port: 4000,
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
      name: 'container',
      remotes: {
        dashboard: 'dashboard@http://localhost:4001/remoteEntry.js',
        marketplace: 'marketplace@http://localhost:4002/remoteEntry.js'
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