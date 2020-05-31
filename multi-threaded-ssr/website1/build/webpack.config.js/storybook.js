const { client: loaders } = require("./loaders");
const { client: plugins } = require("./plugins");

// this still needs work, the platform as undergone changes since.

module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.plugins = [...storybookBaseConfig.plugins, ...plugins];
  storybookBaseConfig.module.rules = [
    ...storybookBaseConfig.module.rules,
    ...loaders,
  ];

  return storybookBaseConfig;
};
