const { withFederatedSidecar } = require("@module-federation/nextjs-mf");

module.exports = withFederatedSidecar({
  name: "remote",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./nextjs-remote-component": "./components/nextjs-remote-component.js",
    "./nextjs-remote-page": "./pages/index.js",
  },
  shared: {
    // react: {
    //   // Notice shared are NOT eager here.
    //   requiredVersion: false,
    //   singleton: true,
    // },
  },
})({
  // your original next.config.js export
  reactStrictMode: true,
});