const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3002,
  },
  output: {
    publicPath: "http://localhost:3002/",
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
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      library: { type: "var", name: "app2" },
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/Widget",
      },
      shared: {
        react: {
          // can be referenced by import "my-vue"
          import: "react", // the "vue" package will be used a provided and fallback module
          shareKey: "react", // under this name the shared module will be placed in the share scope
          shareScope: "default", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
          // strictVersion: true, // don't use shared version when version isn't valid. Singleton or modules without fallback will throw, otherwise fallback is used
          // version: "1.2.3", // the version of the shared module
          // requiredVersion: ^1.0.0" // the required version of the shared module
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
