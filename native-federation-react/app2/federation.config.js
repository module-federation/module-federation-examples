const {
  withNativeFederation,
  shareAll,
} = require("@softarc/native-federation/build");

module.exports = withNativeFederation({
  name: "mfe1",

  exposes: {
    "./component": "./mfe1/component"
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
      includeSecondaries: false,
    }),
  },

  // skip: [
  //   '@softarc/native-federation'
  // ]

});
