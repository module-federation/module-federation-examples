const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('@module-federation/dashboard-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { readFileSync } = require('fs');

const env = readFileSync(__dirname + '/../.env')
  .toString('utf-8')
  .split('\n')
  .map(v => v.trim().split('='));

process.env.DASHBOARD_WRITE_TOKEN = env.find(([k]) => k === 'DASHBOARD_WRITE_TOKEN')[1];
process.env.DASHBOARD_BASE_URL = env.find(([k]) => k === 'DASHBOARD_BASE_URL')[1];

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3002,
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: `auto`,
  },
  cache: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                math: 'always',
              },
            },
          },
        ],
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
  optimization: {
    minimize: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dsl__REMOTE_VERSION__',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Button': './src/Button',
        './Carousel': './src/Carousel',
        './TextField': './src/TextField',
      },
      // sharing code based on the installed version, to allow for multiple vendors with different versions
      shared: require('./package.json').dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new DashboardPlugin({
      versionStrategy: `${Date.now()}`,
      filename: 'dashboard.json',
      environment: 'development',
      dashboardURL: `${process.env.DASHBOARD_BASE_URL}/update?token=${process.env.DASHBOARD_WRITE_TOKEN}`,
      metadata: {
        baseUrl: 'http://localhost:3002',
        source: {
          url: 'https://github.com/module-federation/federation-dashboard/tree/master/dashboard-example/dsl',
        },
        remote: 'http://localhost:3002/remoteEntry.js',
      },
    }),
  ],
};
