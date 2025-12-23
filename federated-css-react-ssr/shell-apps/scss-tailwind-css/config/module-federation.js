const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const { UniversalFederationPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    experiments: { asyncStartup: true },
      name: 'shell',
    filename: 'container.js',
    remotes: {
      expose_tailwind_css: 'expose_tailwind_css@http://localhost:3003/client/remoteEntry.js',
      expose_scss: 'expose_scss@http://localhost:3004/client/remoteEntry.js',
    },
    shared: [
      {
        react: deps.react,
        'react-dom': deps['react-dom'],

        'styled-components': {
          singleton: true,
        },
        'react-jss': {
          singleton: true,
        },
        'isomorphic-style-loader': {
          singleton: true,
        },
      },
    ],
  }),
  server: [
    new UniversalFederationPlugin({
      isServer: true,
      useRuntimePlugin: true,
      name: 'shell',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        expose_tailwind_css: 'expose_tailwind_css@http://localhost:3003/server/remoteEntry.js',
        expose_scss: 'expose_scss@http://localhost:3004/server/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        'styled-components': { singleton: true },
        'react-jss': { singleton: true },
        'isomorphic-style-loader': { singleton: true },
      },
    }),
  ],
};
