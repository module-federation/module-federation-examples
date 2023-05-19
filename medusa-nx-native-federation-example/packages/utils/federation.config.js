const {
  withNativeFederation
} = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'utils',

  exposes: {
    './analytics': 'packages/utils/src/app/analytics.ts',
    './foo': 'packages/utils/src/app/foo.ts'
  },

  shared: {},

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
