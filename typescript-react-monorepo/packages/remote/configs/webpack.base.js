const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
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
    new FederatedTypesPlugin({
      federationConfig,
    }),

    new HtmlWebpackPlugin({
      template: "public/index.html",
      title: "Remote App",
      filename: "index.html",
      chunks: ["main"],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  target: "web",
};
