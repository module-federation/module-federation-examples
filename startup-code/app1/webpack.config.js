const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: {
    // we add an entrypoint with the same name as our name in ModuleFederationPlugin.
    // This merges the two "chunks" together. When a remoteEntry is placed on the page,
    // the code in this app1 entrypoint will execute as part of the remoteEntry startup.
    app1: "./src/setPublicPath",
    main: "./src/index",
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
  },
  output: {
    // public path can be what it normally is, not a absolute, hardcoded url
    publicPath: "/",
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
  //http://localhost:3002/remoteEntry.js
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      excludeChunks: ["app1"],
    }),
  ],
};
