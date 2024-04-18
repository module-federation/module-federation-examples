const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('@module-federation/enhanced').ModuleFederationPlugin;

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
module.exports = {
  entry: {
    bundle: ['./src/main.js'],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte', 'browser', 'import'],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: 'auto',
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
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
           MiniCssExtractPlugin.loader,
          'css-loader',
        ],
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
      shared: [],
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-style.css',
    }),
  ],
  devtool: prod ? false : 'source-map',
};
