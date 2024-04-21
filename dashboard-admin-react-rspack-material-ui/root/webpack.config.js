const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {ModuleFederationPlugin} = require("@module-federation/enhanced");
const dependencies = require("./package.json").dependencies;
var WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.join(__dirname, './dist'),
    filename: "main.js",
    publicPath: '/',
  },

  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  name: "shell",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: 'Progressive Web Application',
      excludeChunks:['shell']
    }),
    new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('public/apple-touch-icon.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },

      ]
    }),
    new MiniCssExtractPlugin(),
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
          Nav: "Nav@http://localhost:3002/remoteEntry.js",
          Dashboard: "Dashboard@http://localhost:3001/remoteEntry.js",
          FAQ: "FAQ@http://localhost:3003/remoteEntry.js",
          Team: "team@http://localhost:3004/remoteEntry.js"

      },
      exposes: {},
      shared: {
        "react": {
          singleton: true,
          requiredVersion: dependencies.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"]
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: dependencies["react-router-dom"]
        },
        "@mui/material": {
          singleton: true,
          requiredVersion: dependencies["@mui/material"]
        },
        "@mui/icons-material": {
          singleton: true,
          requiredVersion: dependencies["@mui/icons-material"]
        },
        "@emotion/react": {
          singleton: true,
          requiredVersion: dependencies["@emotion/react"]
        },
      }
    })
  ],
};
