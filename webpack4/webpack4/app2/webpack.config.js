const HtmlWebpackPlugin = require("html-webpack-plugin");
const MF = require("mf-webpack4")
const fs = require("fs")
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  context: __dirname,
  output: {
    filename: '[name].js',
    chunkFilename: "[name].js",
    path: `${__dirname}/dist`,
    publicPath: "http://localhost:9002/",
  },
  devServer: {
    hot: true,
    open: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
    historyApiFallback: true,
    port: 9002,
  },
  plugins: [
    new ReactRefreshPlugin({
      overlay: false
    }),
    new MF({
      name: "app2",
      filename: "remoteEntry.js",
      shared: {
        "react": {
          singleton: true,
        },
        "react-dom": {
          singleton: false,
        }
      },
      exposes: {
        "./App": "./src/App2"
      }
    }),
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(process.cwd(), "babel.config.js"),
              babelrc: false
            }
          }
        ]
      },
    ]
  }
};