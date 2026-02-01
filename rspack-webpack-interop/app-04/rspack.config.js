const { HtmlRspackPlugin } = require('@rspack/core');
const path = require('path');
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack')

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: './src/main.js',
  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte', 'browser', 'import'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true,
          },
        },
      },
      {
        test: /\.css$/,
        type: 'css',
      },
    ],
  },
  mode,
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_04',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/main.js',
        './loadApp': './src/loadApp.js',
      },
      experiments: {
        asyncStartup: true,
      },
      shareStrategy: 'loaded-first',
      shared: [],
    }),
    new HtmlRspackPlugin({
      template: './src/index.html',
      chunks: ['main'],
    }),
  ],
  devtool: prod ? false : 'source-map',
  experiments: {
    css: true,
  },
};
