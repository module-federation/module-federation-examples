const plugins = require("./plugins");
const resolvers = require("./resolvers");
const config = require("../config");
const env = require("../env")();

const { publicPath, clientPath } = config[env.raw.NODE_ENV || "development"];

module.exports = {
  target: "web",
  output: {
    path: clientPath,
    filename: "[name].js",
    publicPath,
    chunkFilename: "[name].chunk.js",
  },
  resolve: { ...resolvers },

  plugins: plugins.shared,
};
