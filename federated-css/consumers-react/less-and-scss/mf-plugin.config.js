const { getRemoteEntry, remotes } = require('../../expose-remotes/remotes.config');

module.exports = {
  experiments: { asyncStartup: true },
  name: 'less_and_scss',
  shareStrategy: 'loaded-first',
  remotes: {
    expose_scss: getRemoteEntry(remotes.scss),
    expose_less: getRemoteEntry(remotes.less),
  },
  shared: {
    react: {
      requiredVersion: false,
      singleton: true,
    },
  },
};
