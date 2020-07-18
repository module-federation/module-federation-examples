const webpack = require("webpack");
const ExtractCSSChunks = require("mini-css-extract-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const env = require("../env")();

const shared = [];
// Due to instability with webpack 4.20 and up, HardSourceWebpackPlugin will remain disabled
// env.raw.NODE_ENV === 'development' && shared.push(new HardSourceWebpackPlugin())

const client = [
  new webpack.DefinePlugin(env.stringified),
  new LoadablePlugin({ filename: "stats.json", writeToDisk: true }),
  new webpack.DefinePlugin({
    API_URL: JSON.stringify(require("../config")[env.raw.NODE_ENV].apiUrl),
  }),
  new ExtractCSSChunks(),
];

const server = [
  new ExtractCSSChunks({}),
  new webpack.DefinePlugin({
    API_URL: JSON.stringify(require("../config")[env.raw.NODE_ENV].apiUrl),
  }),
];

module.exports = {
  shared,
  client,
  server,
};
