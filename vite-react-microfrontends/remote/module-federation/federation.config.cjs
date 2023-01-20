const {
  withNativeFederation, shareAll,
} = require("@softarc/native-federation/build");

module.exports = withNativeFederation({
  name: "remote",
  exposes: {
    "./remote-app": "./src/App.tsx"
  },
  shared: shareAll(),
  skip: [
    'react-dom/server',
    'react-dom/server.node',
  ],
});

