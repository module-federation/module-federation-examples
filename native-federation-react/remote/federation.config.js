const { withNativeFederation, shareAll } = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'remote',

  exposes: {
    './module': 'remote/src/is-long-weekend.ts',
    './react-remote': 'remote/src/react-app.tsx',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: false,
    }),
  },

  // skip: [
  //   '@softarc/native-federation'
  // ]
});
