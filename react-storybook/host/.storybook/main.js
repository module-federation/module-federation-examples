const moduleFederationConfig = require('../modulefederation.config.js');

const storybookConfig = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    {
      name: "@module-federation/storybook-addon",
      options: {
        moduleFederationConfig
      }
    }
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
};

module.exports = storybookConfig;
