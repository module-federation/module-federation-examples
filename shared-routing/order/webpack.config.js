const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3002,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
  },
  output: {
    publicPath: "http://localhost:3002/",
  },
  resolve: {
    alias: {
      events: "events",
    },
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
      name: "order",
      library: { type: "var", name: "order" },
      filename: "remoteEntry.js",
      remotes: {
        shell: "shell",
      },
      exposes: {
        "./RecentOrdersWidget": "./src/RecentOrdersWidget",
        "./OrderService": "./src/OrderService",
      },
      shared: ["react", "react-dom", "@material-ui/core", "@material-ui/icons"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
