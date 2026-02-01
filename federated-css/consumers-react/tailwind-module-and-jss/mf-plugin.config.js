const { getRemoteEntry, remotes } = require('../../expose-remotes/remotes.config');

module.exports = {
  experiments: { asyncStartup: true },
  name: 'tailwind-module-and-jss',
  remotes: {
    expose_jss: getRemoteEntry(remotes.jss),
    expose_tailwind_css_module: getRemoteEntry(remotes.tailwindCssModule),
  },
  shared: {
    react: {
      requiredVersion: false,
      singleton: true,
    },
  },
};
