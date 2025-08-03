const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('@module-federation/enhanced').ModuleFederationPlugin;
const path = require('path');
const deps = require('./package.json').dependencies;
module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    port: 3003,
  },
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
        options: {
          presets: ['@babel/preset-react'],
        },
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
      shared: {
        react: {
          requiredVersion: deps.react,
          import: 'react',
          shareKey: 'react',
          shareScope: 'default',
          singleton: true,
          strictVersion: true,
        },
        'react-dom': {
          requiredVersion: '^18.3.1',
          singleton: true,
          strictVersion: true,
        },
        'react/jsx-runtime': {
          singleton: true,
        },
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
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
