const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
          new NextFederationPlugin({
            name: 'host',
            remotes: {
              remote: 'remote@http://localhost:8081/remoteEntry.js',
            },
            shared: {
              react: {
                singleton: true,
                eager: true,
                requiredVersion: false,
              },
            },
            filename: 'static/chunks/remoteEntry.js',
          }),
      );
    }

    return config;
  },
};


// /**
//  * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
//  **/
// const nextConfig = {
//   nx: {
//     // Set this to true if you would like to to use SVGR
//     // See: https://github.com/gregberge/svgr
//     svgr: false,
//   },
//   webpack5: true,
//   webpack(config, options) {
//     const { isServer } = options;
//
//     config.experiments = { topLevelAwait: true };
//
//     config.module.rules.push({
//       test: /_app.tsx/,
//       loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
//     });
//
//     if (isServer) {
//       // ignore it on SSR, realistically you probably wont be SSRing Fmodules, without paid support from @ScriptedAlchemy
//       Object.assign(config.resolve.alias, {
//         checkout: false,
//         store: false,
//       });
//     }
//
//     return merge.merge(config, {
//       entry() {
//         return config.entry().then(entry => {
//           return entry;
//         });
//       },
//     });
//   },
// };
//
// module.exports = withFederatedSidecar({
//   name: 'store',
//   filename: 'static/chunks/remoteEntry.js',
//   remotes: {
//     remote: 'remote@http://localhost:8081/remoteEntry.js',
//   },
//   shared: {
//     react: {
//       singleton: true,
//       eager: true,
//       requiredVersion: false,
//     },
//   },
// })(nextConfig);




// const withTranspileModules = require('next-transpile-modules')(['@module-federation/nextjs-mf']);
//
// module.exports = withTranspileModules({
//   remotes: {
//     remote: 'remote@http://localhost:8081/remoteEntry.js',
//   },
//   shared: {
//     react: {
//       singleton: true,
//       eager: true,
//       requiredVersion: false,
//     },
//   },
// })


// module.exports = {
//   webpack5: true,
//   webpack(config, options) {
//     const { webpack, isServer } = options;
//     config.experiments = {
//       topLevelAwait: true,
//       layers: true
//     };
//
//     config.module.rules.push({
//       test: /_app.js/,
//       loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
//     });
//
//     config.plugins.push(
//       new webpack.container.ModuleFederationPlugin({
//         remotes: {
//           remote: 'remote@http://localhost:8081/remoteEntry.js',
//         },
//         shared: {
//           react: {
//             singleton: true,
//             eager: true,
//             requiredVersion: false,
//           },
//         },
//         // we have to share something to ensure share scope is initialized
//         // "@module-federation/nextjs-mf/lib/noop": {
//         //   eager: false,
//         // },
//       }),
//     );
//     return config;
//   },
// };
