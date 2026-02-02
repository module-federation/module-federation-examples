const { getRemoteEntry, remotes } = require('../../expose-remotes/remotes.config');

module.exports = {
  experiments: { asyncStartup: true },
  name: 'jss_tailwind',
  shareStrategy: 'loaded-first',
  remotes: {
    expose_css: getRemoteEntry(remotes.css),
    expose_styled_component: getRemoteEntry(remotes.styledComponent),
  },
  shared: {
    react: {
      requiredVersion: false,
      singleton: true,
    },
  },
};
