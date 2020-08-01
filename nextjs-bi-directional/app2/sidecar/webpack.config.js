const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8082,
  },
  output: {
    publicPath: "http://localhost:8082/",
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
      filename: "remoteEntry.js",
      remotes: {
        app1: "app1",
      },
      exposes: {
        "./GreetingAppTwo": "../components/GreetingAppTwo",
      },
      shared: dependencies,
    }),
  ],
};
