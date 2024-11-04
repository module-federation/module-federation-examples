const path = require("path");
const { container } = require("webpack");

module.exports = [
  {
    target: "webworker",
    mode: "development",
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
      path: path.resolve(__dirname, "build/worker"),
      filename: "module-bundle-[name].js",
      chunkFilename: "module-chunk-[name].js",
      publicPath: "http://localhost:3001/",
    },
    plugins: [
      new container.ModuleFederationPlugin({
        name: "myModule",
        filename: "remoteEntry.js",
        exposes: {
          "./testValue": path.resolve(__dirname, "src/testValue.js"),
        },
      }),
    ],
  },
  {
    mode: "development",
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: "module-bundle-[name].js",
      chunkFilename: "module-chunk-[name].js",
      publicPath: "http://localhost:3001/",
    },
    plugins: [
      new container.ModuleFederationPlugin({
        name: "myModule",
        filename: "remoteEntry.js",
        exposes: {
          "./testValue": path.resolve(__dirname, "src/testValue.js"),
        },
      }),
    ],
  },
];
