const { dependencies } = require('./package.json');

module.exports = {
  name: 'host',
  shareStrategy: 'loaded-first',
  experiments: { asyncStartup: true },
  remotes: {
    remote: 'remote@http://localhost:3002/remoteEntry.js',
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
