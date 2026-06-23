const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

const webpackConfigPath = 'react-scripts/config/webpack.config';
const webpackConfig = require(webpackConfigPath);

const override = config => {
  const oneOfRule = config.module.rules.find(rule => Array.isArray(rule.oneOf));

  oneOfRule?.oneOf.unshift({
    test: /\.cjs$/,
    type: 'javascript/auto',
  });

  config.plugins.push(new ModuleFederationPlugin(require('../../modulefederation.config.js')));

  config.output.publicPath = 'auto';

  return config;
};

require.cache[require.resolve(webpackConfigPath)].exports = env => override(webpackConfig(env));

module.exports = require(webpackConfigPath);
