const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3003,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
  },
  output: {
    publicPath: "http://localhost:3003/",
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
      name: "sales",
      library: { type: "var", name: "sales" },
      filename: "remoteEntry.js",
      remotes: {
        shell: "shell",
      },
      exposes: {
        TodayWidget: "./src/TodayWidget",
        DepositsWidget: "./src/DepositsWidget",
      },
      shared: [
        "react",
        "react-dom",
        "@material-ui/core",
        "@material-ui/icons",
        "recharts",
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
