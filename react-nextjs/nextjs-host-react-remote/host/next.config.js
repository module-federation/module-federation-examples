module.exports =
  ({
    webpack5: true,
    webpack(config, options) {
      const { webpack, isServer } = options;
      config.experiments = { topLevelAwait: true };

      config.module.rules.push({
        test: /_app.js/,
        loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
      });

      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
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
          // we have to share something to ensure share scope is initialized
          // "@module-federation/nextjs-mf/lib/noop": {
          //   eager: false,
          // },
        }),
      );
      return config;
    }
  });