const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('@module-federation/dashboard-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

const { readFileSync } = require('fs');
const tokens = readFileSync(__dirname + '/../.env')
  .toString('utf-8')
  .split('\n')
  .map(v => v.trim().split('='));
process.env.DASHBOARD_READ_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_READ_TOKEN')[1];
process.env.DASHBOARD_WRITE_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_WRITE_TOKEN')[1];
process.env.DASHBOARD_BASE_URL = tokens.find(([k]) => k === 'DASHBOARD_BASE_URL')[1];

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3004,
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
    new ModuleFederationPlugin({
      name: 'search__REMOTE_VERSION__',
      library: { type: 'var', name: 'search__REMOTE_VERSION__' },
      filename: 'remoteEntry.js',
      remotes: {
        nav: DashboardPlugin.clientVersion({
          currentHost: 'search',
          remoteName: 'nav',
          dashboardURL: `${process.env.DASHBOARD_BASE_URL}/env/development/get-remote?token=${process.env.DASHBOARD_READ_TOKEN}`,
        }),
        dsl: DashboardPlugin.clientVersion({
          currentHost: 'search',
          remoteName: 'dsl',
          dashboardURL: `${process.env.DASHBOARD_BASE_URL}/env/development/get-remote?token=${process.env.DASHBOARD_READ_TOKEN}`,
        }),

        home: DashboardPlugin.clientVersion({
          currentHost: 'search',
          remoteName: 'home',
          dashboardURL: `${process.env.DASHBOARD_BASE_URL}/env/development/get-remote?token=${process.env.DASHBOARD_READ_TOKEN}`,
        }),
        utils: DashboardPlugin.clientVersion({
          currentHost: 'search',
          remoteName: 'utils',
          dashboardURL: `${process.env.DASHBOARD_BASE_URL}/env/development/get-remote?token=${process.env.DASHBOARD_READ_TOKEN}`,
        }),
      },
      exposes: {
        './SearchList': './src/SearchList',
        './MiniSearch': './src/MiniSearch',
      },
      shared: require('./package.json').dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new DashboardPlugin({
      versionStrategy: `${Date.now()}`,
      filename: 'dashboard.json',
      dashboardURL: `${process.env.DASHBOARD_BASE_URL}/update?token=${process.env.DASHBOARD_WRITE_TOKEN}`,
      metadata: {
        baseUrl: 'http://localhost:3004',
        source: {
          url: 'https://github.com/module-federation/federation-dashboard/tree/master/dashboard-example/search',
        },
        remote: 'http://localhost:3004/remoteEntry.js',
      },
    }),
  ],
};
