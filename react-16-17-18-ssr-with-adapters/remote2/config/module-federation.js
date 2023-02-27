const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'remote2',
    filename: 'remoteEntry.js',
    remotes: {},
    exposes: {
      './Image': './src/Image',
      './newReact': require.resolve('react'),
      './newReactDOM': require.resolve('react-dom'),
    },
    shared: {
      ...deps,
      react: {
        singleton: true,
        shareKey: 'newReact',
        shareScope: 'default',
        requiredVersion: deps.react,
      },
      'react-dom': {
        singleton: true,
        shareKey: 'newReactDOM',
        shareScope: 'default',
        requiredVersion: deps['react-dom'],
      },
      'react-version-adapter': {
        singleton: true,
        requiredVersion: deps['react-version-adapter'],
      },
    },
  }),
  server: [
    new NodeFederationPlugin({
      name: 'remote2',
      filename: 'remoteEntry.js',
      library: { type: 'commonjs-module' },
      remotes: {},
      exposes: {
        './Image': './src/Image',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new StreamingTargetPlugin({
      name: 'remote2',
      library: { type: 'commonjs-module' },
      remotes: {},
    }),
  ],
};
