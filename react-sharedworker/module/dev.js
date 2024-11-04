const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const [config1, config2] = require("./webpack.module-config.js");

const compiler1 = webpack(config1);
const compiler2 = webpack(config2);

app.use(
  webpackDevMiddleware(compiler1, {
    publicPath: config1.output.publicPath + "worker/",
  })
);

app.use(
  webpackDevMiddleware(compiler2, {
    publicPath: config2.output.publicPath,
  })
);

app.listen(3001, function () {
  console.log("App listening on port 3001!\n");
});
