const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index',
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: 'auto',
    uniqueName: 'app3',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
  },
  devServer: {
    port: 3003,
    hot: !isProd,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve('@babel/preset-react')],
          plugins: [!isProd && require.resolve('react-refresh/babel')].filter(Boolean),
        },
      },
    ],
  },

  plugins: [
    !isProd && new ReactRefreshWebpackPlugin(),
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      dts: false,
      name: 'app_03',
      filename: 'remoteEntry.js',
      remotes: {
        app_01: 'app_01@http://localhost:3001/remoteEntry.js',
      },
      exposes: {
        './Button': './src/Button',
      },
      shareStrategy: 'loaded-first',
      shared: {
        'react-dom': {
          singleton: true,
          requiredVersion: false,
          eager: true,
        },
        react: {
          singleton: true,
          requiredVersion: false,
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ].filter(Boolean),
};
