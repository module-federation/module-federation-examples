const {
  HtmlRspackPlugin,
  container: { ModuleFederationPlugin },
} = require('@rspack/core');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/index',
  devServer: {
    port: 3003,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
  },
  experiments: {
    css: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
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
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    publicPath: 'auto',
  },
  mode,
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_03',
      filename: 'remoteEntry.js',
      remotes: {
        app_01: 'app_01@http://localhost:3001/remoteEntry.js',
      },
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        'react-dom': {
          singleton: true,
        },
        react: {
          singleton: true,
        },
      },
    }),
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
};
