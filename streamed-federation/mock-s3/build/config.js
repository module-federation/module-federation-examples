const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const dotenvFile = path.resolve(__dirname, "../.env");
if (fs.existsSync(dotenvFile)) {
  dotenv.config({
    path: dotenvFile,
  });
}

module.exports = {
  dotenv: path.resolve(__dirname, "../.env"),
  development: {
    clientPath: path.resolve(__dirname, "../buildClient"),
    serverPath: path.resolve(__dirname, "../buildServer"),
    publicPath: "/static/",
  },
  production: {
    clientPath: path.resolve(__dirname, "../buildClient"),
    serverPath: path.resolve(__dirname, "../buildServer"),
    publicPath: "/static/",
  },
};
