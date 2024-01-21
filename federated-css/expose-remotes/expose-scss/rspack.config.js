const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@rspack/core').container;
const path = require('path');
const {
  remotes: { scss },
  mfeBaseConfig,
} = require('../remotes.config');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: scss.port,
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      ...mfeBaseConfig,
      name: scss.name,
      exposes: {
        // './StyleScss': './src/Button.styles.scss',
        './Component': './src/Component.js',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
