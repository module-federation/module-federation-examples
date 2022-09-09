const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = webpack.container;
const { DefinePlugin} = webpack;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3002,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: [{
          loader:"style-loader",
          options: {
            insert: function insertInShadowRoot(style) {
              if(!window["shadowWrapper"]) {
                window["shadowWrapper"] = document.createElement('div');
                window["shadowWrapper"].id = "app2-shadow-wrapper";
                window["shadowWrapper"].attachShadow({ mode: "open", delegatesFocus: true });
                window["shadowWrapper"].style.all = "initial";

                var appPlaceholder = document.createElement('div');
                appPlaceholder.id = "app2-placeholder";
                window["shadowWrapper"].shadowRoot.appendChild(appPlaceholder);
              }
              window["shadowWrapper"].shadowRoot.insertBefore(style, window["shadowWrapper"].shadowRoot.firstChild);
            }
          }
        }, "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      library: { type: "var", name: "app2" },
      filename: "remoteEntry.js",
      exposes: {
        "./injectApp": "./src/injectApp",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
