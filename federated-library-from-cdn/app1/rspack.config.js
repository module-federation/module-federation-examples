const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("@rspack/core").container;
require('dotenv').config({ path: './.env' });

const remoteUrl = "https://federated-library.pages.dev/remoteEntry.js"

module.exports = {
  mode: "development",
  devServer: {
    port: 3000,
    hot: true,
    compress: true,
    watchFiles: ['src/**/*'],
  },
  target: 'web',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      process: 'process/browser',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        remoteLibrary: `remoteLibrary@${remoteUrl}`,
      },
    }),
  ],
};

