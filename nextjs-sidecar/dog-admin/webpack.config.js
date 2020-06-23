const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:8081/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
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
      library: { type: "var", name: "dog_admin" },
      filename: "remoteEntry.js",
      remotes: {
        dogs: "dogs",
      },
      exposes: {
        "./DogName": "./src/DogName",
      },
      shared: ["react"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
