const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('@module-federation/dashboard-plugin');
const { readFileSync } = require('fs');
const tokens = readFileSync(__dirname + '/../.env')
  .toString('utf-8')
  .split('\n')
  .map(v => v.trim().split('='));
process.env.DASHBOARD_READ_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_READ_TOKEN')[1];
process.env.DASHBOARD_WRITE_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_WRITE_TOKEN')[1];
process.env.DASHBOARD_BASE_URL = tokens.find(([k]) => k === 'DASHBOARD_BASE_URL')[1];

const {
  container: { ModuleFederationPlugin },
} = require('webpack');
const path = require('path');

const dashboardURL = `${process.env.DASHBOARD_BASE_URL}/env/development/get-remote?token=${process.env.DASHBOARD_READ_TOKEN}`;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3001,
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
        loader: require.resolve('esbuild-loader'),
        exclude: /node_modules/,
        options: {
          loader: 'jsx',
          target: 'es2015',
        },
      },
    ],
  },
  plugins: [
    // new FunctionCall(),
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      library: { type: 'var', name: 'home' },
      remotes: {
        dsl: DashboardPlugin.clientVersion({
          currentHost: 'home',
          remoteName: 'dsl',
          dashboardURL,
        }),
        search: DashboardPlugin.clientVersion({
          currentHost: 'home',
          remoteName: 'search',
          dashboardURL,
        }),
        nav: DashboardPlugin.clientVersion({
          currentHost: 'home',
          remoteName: 'nav',
          dashboardURL,
        }),
        utils: DashboardPlugin.clientVersion({
          currentHost: 'home',
          remoteName: 'utils',
          dashboardURL,
        }),
      },
      exposes: {
        './ProductCarousel': './src/ProductCarousel',
        './HeroImage': './src/HeroImage',
      },
      // sharing code based on the installed version, to allow for multiple vendors with different versions
      shared: require('./package.json').dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      excludeChunks: ['remoteEntry'],
    }),
    new DashboardPlugin({
      versionStrategy: `${Date.now()}`,
      filename: 'dashboard.json',
      dashboardURL: `${process.env.DASHBOARD_BASE_URL}/update?token=${process.env.DASHBOARD_WRITE_TOKEN}`,
      versionChangeWebhook: 'http://cnn.com/',
      metadata: {
        clientUrl: process.env.DASHBOARD_BASE_URL,
        baseUrl: 'http://localhost:3001',
        source: {
          url: 'https://github.com/module-federation/federation-dashboard/tree/master/dashboard-example/home',
        },
        remote: 'http://localhost:3001/remoteEntry.js',
      },
    }),
  ],
};
