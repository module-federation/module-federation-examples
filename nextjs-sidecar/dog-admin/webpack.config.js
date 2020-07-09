const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8081,
  },
  output: {
    publicPath: "http://localhost:8081/",
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
      name: "dog_admin",
      filename: "remoteEntry.js",
      remotes: {
        dogs: "dogs@http://localhost:8080/remoteEntry.js",
      },
      exposes: {
        "./DogName": "./src/DogName",
      },
      shared: [
        {
          ...dependencies,
          react: {
            singleton: true,
            requiredVersion: dependencies.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
