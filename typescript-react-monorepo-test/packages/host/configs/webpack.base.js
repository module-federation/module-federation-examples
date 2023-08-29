const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const federationConfig = require("./federationConfig");

module.exports = {
  entry: {
    main: path.join(__dirname, "../src/index.js"),
  },

  output: {
    publicPath: "auto",
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/, // add |ts
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed,
    }),
    new FederatedTypesPlugin({
      federationConfig: federationConfig(process.env.REMOTE_URL),
    }),

    new HtmlWebpackPlugin({
      template: "public/index.html",
      title: "Host App",
      filename: "index.html",
      chunks: ["main"],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  target: "web",
};
