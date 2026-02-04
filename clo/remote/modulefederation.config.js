const { dependencies } = require('./package.json');

module.exports = {
  name: 'remote',
  shareStrategy: 'loaded-first',
  experiments: { asyncStartup: true },
  exposes: {
    './Button': './src/Button',
    './ServiceComponent': './src/ServiceComponent',
  },
  filename: 'remoteEntry.js',
  shared: {
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
