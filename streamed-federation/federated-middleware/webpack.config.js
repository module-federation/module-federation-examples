const CopyPlugin = require("copy-webpack-plugin");
const StreamedFederationPlugin = require("@module-federation/remote-federation-plugin");

const pkg = require("./package.json");

const externals = Object.keys(pkg.dependencies).map((d) => ({ [d]: d }));

module.exports = {
  mode: "production",
  target: "async-node",
  entry: "./src/noop.js",
  output: {
    libraryTarget: "commonjs2",
  },
  optimization: {
    minimize: false,
  },
  externals,
  resolve: {
    extensions: [".mjs", ".js", ".json"],
    alias: {
      encoding: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
    ],
  },
  plugins: [
    new CopyPlugin([{ from: "package.json", to: "package.json" }]),
    new StreamedFederationPlugin({
      name: "federatedMiddleware",
      library: { type: "commonjs2" },
      filename: "remoteEntry.js",
      shared: externals,
      exposes: {
        extraRoute: "./src/extra-route.js",
      },
    }),
  ],
};
