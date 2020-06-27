const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const pkg = require('./package.json');

module.exports = {
  entry: "./src/index",
  mode: "production",
  target: 'web',
  devtool: false,
  output: {
    libraryTarget: 'system',
    libraryExport: 'main',
    publicPath: "http://localhost:8081/",
  },
  optimization: {
    minimize: true,
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
  // externals: ['react', 'react-dom'],
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      library: { type: "system" },
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
      },
      remotes: {
        'app2': './remoteEntry.js'
      },
      shared: {
        react: {
          eager: true,
          singleton: true,
          requiredVersion: pkg.dependencies.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: pkg.dependencies["react-dom"],
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};
