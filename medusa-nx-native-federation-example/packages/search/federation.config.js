const {
  withNativeFederation,
  shareAll
} = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'search',

  exposes: {
    './SearchList': 'packages/search/src/app/SearchList.tsx',
    './MiniSearch': 'packages/search/src/app/MiniSearch.tsx',
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
