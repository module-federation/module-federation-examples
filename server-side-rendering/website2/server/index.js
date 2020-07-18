const express = require("express");
const chalk = require("chalk");
const initMiddleware = require("./middleware");

const { raw: env } = require("../build/env")();

const app = express();

/**
 * All application expressjs middleware
 */

const done = () => {
  app.listen(env.PORT, () => {
    console.info(
      `[${new Date().toISOString()}]`,
      chalk.blue(`App is running: 🌎 http://localhost:${env.PORT}`)
    );
  });
};

initMiddleware(express, app, done);

module.exports = app;
