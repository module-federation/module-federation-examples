const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('@module-federation/dashboard-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

Object.assign(process.env, require('../read-envs')());

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3005,
  },
  cache: false,
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: `auto`,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'jsx',
          target: 'es2015',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'utils__REMOTE_VERSION__',
      library: { type: 'var', name: 'utils__REMOTE_VERSION__' },
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './analytics': './src/analytics',
        './foo': './src/foo',
      },
      shared: require('./package.json').dependencies,
    }),
    new DashboardPlugin({
      versionStrategy: `${Date.now()}`,
      environment: 'pusha',
      dashboardURL: `${process.env.DASHBOARD_BASE_URL}/update?token=${process.env.DASHBOARD_WRITE_TOKEN}`,
      filename: 'dashboard.json',
      metadata: {
        baseUrl: 'http://localhost:3005',
        source: {
          url: 'https://github.com/module-federation/federation-dashboard/tree/master/dashboard-example/utils',
        },
        remote: 'http://localhost:3005/remoteEntry.js',
      },
    }),
  ],
};
