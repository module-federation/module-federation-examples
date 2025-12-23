const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/index.ts',
    },
  },
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        experiments: { asyncStartup: true },
        name: 'app_general',
        filename: 'remoteEntry.js',
        remotes: {
          app_exposes: 'app_exposes@http://localhost:8082/remoteEntry.js',
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),
    ],
  },
  transpileDependencies: true,
});
