const { getRemoteEntry, remotes } = require('../../expose-remotes/remotes.config');

module.exports = {
  experiments: { asyncStartup: true },
  name: 'tailwind-global-and-less',
  shareStrategy: 'loaded-first',
  remotes: {
    expose_less: getRemoteEntry(remotes.less),
    expose_tailwind_css_global: getRemoteEntry(remotes.tailwindCssGlobal),
  },
  shared: {
    react: {
      requiredVersion: false,
      singleton: true,
    },
  },
};
