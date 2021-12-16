const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const packageJson = require("./package.json");

const shared = {
  ...packageJson.dependencies,
  react: { singleton: true },
  "react-dom": { singleton: true },
  lodash: {
    singleton: true,
    version: packageJson.dependencies["lodash"],
    requiredVersion: packageJson.dependencies["lodash"],
    strictVersion: false,
    import: false
  },
};

console.info("REMOTE SHARE SCOPE", shared);

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
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      library: { type: "var", name: "app2" },
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
      },
      shared,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
