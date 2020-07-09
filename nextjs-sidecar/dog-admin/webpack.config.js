const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/index",
  mode: "development",
  output: {
    publicPath: "http://localhost:8081/",
  },
  resolve: {
    extensions: [".js"],
  },
  devServer: {
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
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
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
  ],
};
