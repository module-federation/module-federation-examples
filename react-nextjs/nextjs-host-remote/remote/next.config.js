const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
    reactStrictMode: true,
    webpack(config, options) {
        Object.assign(config.experiments, { topLevelAwait: true });

        if (!options.isServer) {
            config.plugins.push(
              new NextFederationPlugin({
                  name: 'remote',
                  exposes: {
                      './nextjs-remote-component': './components/nextjs-remote-component.js',
                  },
                  shared: {},
                  filename: 'static/chunks/remoteEntry.js',
              }),
          );
        }
    return config;
  },
};
//
//
// const { withFederatedSidecar } = require('@module-federation/nextjs-mf');
//
// module.exports = withFederatedSidecar({
//   name: 'remote',
//   filename: 'static/chunks/remoteEntry.js',
//   exposes: {
//     './nextjs-remote-component': './components/nextjs-remote-component.js',
//   },
//   shared: {
//     react: {
//       // Notice shared are NOT eager here.
//       requiredVersion: false,
//       singleton: true,
//     },
//   },
// })({
//   // your original next.config.js export
//   reactStrictMode: true,
// });
