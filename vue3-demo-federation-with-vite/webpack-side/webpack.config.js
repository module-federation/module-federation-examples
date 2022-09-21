const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = (env = {}) => ({
  mode: 'development',
  cache: false,
  target: 'es2020',
  devtool: false,
  entry: path.resolve(__dirname, './src/main.js'),
  experiments: {
    outputModule: true,
  },
  output: {
    // library: {type: 'module'},
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json'],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new ModuleFederationPlugin({
      name: 'webpack-side',
      filename: 'remoteEntry.js',
      library: { type: 'module' },
      exposes: {
        './Content': './src/components/Content',
      },
      remotes: {
        'vite-side': 'http://localhost:5000/assets/remoteEntry.js',
      },
      shared: {
        vue: {
          requiredVersion: '^3.0.0',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      inject: false,
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 5001,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});
