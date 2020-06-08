const StreamedFederationPlugin = require("@module-federation/remote-federation-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  target: "web",
  entry: { client: "./src/client.js" },
  name: "app1",
  output: {
    library: "app1",
    libraryTarget: "var",
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: [".mjs", ".js", ".json"],
    alias: {
      bufferutil: false,
      encoding: false,
      "utf-8-validate": false,
      util: false,
      stream: false,
      zlib: false,
      https: false,
      http: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new StreamedFederationPlugin({
      name: "app1",
      library: { type: "var" },
      filename: "remoteEntry.js",
      shared: ["react", "react-dom", "react-redux", "redux", "redux-thunk"],
      remotes: {
        "@streamed-federation/federated-middleware":
          "@streamed-federation/federated-middleware/remoteEntry.js",
      },
    }),
  ],
};
