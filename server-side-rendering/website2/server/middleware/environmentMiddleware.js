const envsWithMiddleware = ["development", "production"];

const { NODE_ENV } = process.env;
const env =
  envsWithMiddleware.indexOf(NODE_ENV) !== -1 ? NODE_ENV : "production";
const fileEnv = env.toLowerCase();
const middleware = require("./environments/production.js"); // eslint-disable-line import/no-dynamic-require

module.exports = middleware;
