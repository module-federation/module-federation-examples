const { CopyRspackPlugin } = require('@rspack/core');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

const deps = require('./package.json').dependencies;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index',
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
    clean: true,
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  development: !isProduction,
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new CopyRspackPlugin({
      patterns: [
        {
          from: 'public/env-config.json',
          to: 'env-config.json',
          noErrorOnMissing: true,
        },
      ],
    }),
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      name: 'host',
      shareStrategy: 'loaded-first',
      runtimePlugins: [],
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0',
          eager: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0',
          eager: false,
        },
        moment: {
          singleton: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      minify: isProduction && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: isProduction
    ? {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\/\\]node_modules[\/\\]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
        minimize: true,
      }
    : {},
  performance: isProduction
    ? {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      }
    : false,
};
