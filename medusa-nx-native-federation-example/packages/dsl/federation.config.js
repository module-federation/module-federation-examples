const {
  withNativeFederation,
  shareAll
} = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'dsl',

  exposes: {
    './Button': 'packages/dsl/src/app/Button.tsx',
    './Carousel': 'packages/dsl/src/app/Carousel.tsx',
    './TextField': 'packages/dsl/src/app/TextField.tsx',
  },

  shared: {
    "react-dom/client": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: false,
     },
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: false,
    })
  },

  skip: [
    'antd',
    '@swc/helpers',
    '@softarc/native-federation-runtime',
    'core-js',
    'native-federation-plugin',
    'regenerator-runtime',
    'tslib'
  ],
});
