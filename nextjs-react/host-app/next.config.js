const NextFederationPlugin = require('@module-federation/nextjs-mf/lib/NextFederationPlugin');
const { dependencies } = require('./package.json');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          remotes: {
            remote: 'remote@http://localhost:3001/remote.js',
          },
        }),
      );
    }

    return config;
  },
};
