const {
  withNativeFederation,
  shareAll
} = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'nav',

  exposes: {
    './Header': 'packages/nav/src/app/Header.tsx',
    './Footer': 'packages/nav/src/app/Footer.tsx',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: true,
    })
  },

  skip: [
    'antd',
    '@swc/helpers',
    '@softarc/native-federation-runtime',
    'core-js',
    'native-federation-plugin',
    'regenerator-runtime',
    'react-dom/server.browser',
    'react-dom/profiling',
    'react-dom/test-utils',
    'react-dom/server',
    'react-dom/server.node',
    'tslib/',
    'tslib'
  ],
});
