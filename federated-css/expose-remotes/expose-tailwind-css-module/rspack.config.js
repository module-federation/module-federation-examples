const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@rspack/core').container;
const path = require('path');
const {
  remotes: { tailwindCssModule },
  mfeBaseConfig,
} = require('../remotes.config');

module.exports = {
  entry: ['./src/ensureNmdPolyfill', './src/index'],
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    port: tailwindCssModule.port,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'builtin:swc-loader',
        exclude: /node_modules/,
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
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              esModule: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      ...mfeBaseConfig,
      name: tailwindCssModule.name,
      exposes: {
        './TailwindCssModule': './src/tailwind.module.css',
        './Component': './src/Component.js',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
