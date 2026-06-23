const { dependencies } = require('./package.json');

module.exports = {
  name: 'remote',
  shareStrategy: 'loaded-first',
  experiments: { asyncStartup: true },
  exposes: {
    './Button': './src/Button',
  },
  filename: 'remoteEntry.js',
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
