const {
  withNativeFederation,
  shareAll
} = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'home',

  exposes: {
    './ProductCarousel': 'packages/home/src/app/ProductCarousel.tsx',
    './HeroImage': 'packages/home/src/app/HeroImage.tsx',
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
