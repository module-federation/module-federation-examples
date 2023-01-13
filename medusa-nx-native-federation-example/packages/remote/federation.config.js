const {
  withNativeFederation,
  shareAll,
} = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'remote',

  exposes: {
    './module': 'packages/remote/src/app/is-long-weekend.ts',
    './react-remote': 'packages/remote/src/app/react-app.tsx',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: false,
    }),
  },

  skip: [
    '@swc/helpers',
    '@softarc/native-federation-runtime',
    'core-js',
    'native-federation-plugin',
    'regenerator-runtime',
    'tslib'
  ],
});
