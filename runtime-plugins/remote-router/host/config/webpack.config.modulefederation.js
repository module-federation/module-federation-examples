const { dependencies } = require('../package.json');

module.exports = {
  name: 'host',
  // TODO
  // Implement a way to load the remote apps from `remotes-monorepo` without needing to list each one below
  //
  // For example:
  // I would like to load only main file from `http://local.remotes-monorepo.com` as remote app (e.g. remotes-monorepo)
  // that will be responsible to load all remote entries when necessary.
  //
  // So in application, we load the components through this main remote app:
  // import HelloWorld from 'remotes-monorepo/remote-one/HelloWorld
  // or simply
  // import HelloWorld from 'remote-one/HelloWorld
  remotes: {
    'remoteOne': `remote_one@http://local.remotes-monorepo.com/remote-one/remoteEntry.js`, // http://localhost:4200/remoteEntry.js
    'remoteTwo': `remote_two@http://local.remotes-monorepo.com/remote-two/remoteEntry.js`, // http://localhost:4201/remoteEntry.js
  },
  runtimePlugins: [
      require.resolve('./runtimePlugin.js')
  ],

  shared: {
    'react': {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
};
