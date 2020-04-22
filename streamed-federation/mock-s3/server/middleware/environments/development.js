const webpack = require("webpack");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware").default;
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const clientConfig = require("../../../build/webpack.config.js/client.dev");
const serverConfig = require("../../../build/webpack.config.js/server.dev");

module.exports = (express, app, done) => {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const options = {
    publicPath: clientConfig.output.publicPath,
    writeToDisk: true,
  };

  const devMiddleware = webpackDevMiddleware(compiler, options);

  app.use("/favicon.ico", (req, res) => {
    res.send("");
  });

  // into our middleware along with the webpack compiler
  app.use(devMiddleware);

  // this adds hot reloading
  // app.use(webpackHotMiddleware(clientCompiler))

  // this add hot reloading to the actual node server <3, not required but nice to have
  // app.use(webpackHotServerMiddleware(compiler))

  // once the compile is done, we boot up the actual server with the done() function.
  // This is the same method we run for production as well.
  devMiddleware.waitUntilValid(() => {
    console.info("Done Building, Server Will Start");
    done();
  });
};
