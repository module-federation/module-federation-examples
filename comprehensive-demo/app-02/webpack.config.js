const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false
  },

  output: {
    publicPath: "http://localhost:3002/"
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")]
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app_02",
      library: { type: "var", name: "app_02" },
      filename: "remoteEntry.js",
      remotes: {
        app_01: "app_01",
        app_03: "app_03"
      },
      exposes: {
        Dialog: "./src/Dialog",
        Tabs: "./src/Tabs"
      },
      shared: ["react", "react-dom", "@material-ui/core", "react-router-dom"]
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["main"]
    })
  ]
};
