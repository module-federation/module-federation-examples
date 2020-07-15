const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("@module-federation/dashboard-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const path = require("path");
const sharedReduce = ["react", "react-dom"].reduce((shared, pkg) => {
  Object.assign(shared, { [`${pkg}-${require(pkg).version}`]: pkg });
  return shared;
}, {});
module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3002,
  },
  output: {
    publicPath: "http://localhost:3002/",
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
      remotes: {
        app1: "app1@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        Button: "./src/Button",
      },
      shared: sharedReduce,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DashboardPlugin({
      filename: "dashboard.json",
      dashboardURL: "http://localhost:3000/api/update",
      metadata: {
        source: {
          url:
            "https://github.com/module-federation/module-federation-examples/tree/master/dashboard-example/app2",
        },
        remote: "http://localhost:3002/remoteEntry.js",
      },
    }),
  ],
};
