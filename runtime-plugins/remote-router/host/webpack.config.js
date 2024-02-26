const webpack = require('webpack');
const { merge } = require('webpack-merge');

// Webpack configs
const defaultConfig = require('./config/webpack.config.default');
const resolveConfig = require('./config/webpack.config.resolve');
const serveConfig = require('./config/webpack.config.serve');
const buildConfig = require('./config/webpack.config.build');

module.exports = (env, argv) => {
  const config = merge(resolveConfig, defaultConfig(env));

  if (!argv.mode || argv.mode === 'development') {
    return merge(config, serveConfig(env));
  }

  return merge(config, buildConfig(env));
};
