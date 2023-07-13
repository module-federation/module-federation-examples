const { dependencies } = require('../package.json');

const federationConfig = ({ APP1, APP2 }) => {
  return {
    name: 'Host',
    filename: 'remoteEntry.js',

    remotes: {
      app1: `app1@${APP1}/remoteEntry.js`,
      app2: `app2@${APP2}/remoteEntry.js`,
    },
    shared: {
      ...dependencies,
      react: {
        singleton: true,
        requiredVersion: dependencies['react'],
      },
      'react-dom': {
        singleton: true,
        requiredVersion: dependencies['react-dom'],
      },
    },
  };
};

module.exports = federationConfig;
