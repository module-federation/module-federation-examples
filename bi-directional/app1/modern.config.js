import appTools, { defineConfig } from '@modern-js/app-tools';
import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack';
// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  server: {
    port: 3001,
  },
  runtime: {
    router: true,
  },
  source: {
    enableAsyncEntry: true, // Enable async entry for module federation
  },
  tools: {
    webpack: (config, { webpack, appendPlugins }) => {
      // Remove splitChunks optimization
      delete config.optimization.splitChunks;
      config.output.publicPath = 'auto';

      // Add Module Federation Plugin
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'app1',
          filename: 'static/js/remoteEntry.js',
          exposes: {
            './Button': './src/components/button.js',
          },
          remotes: {
            app2: 'app2@http://localhost:3002/static/js/remoteEntry.js',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
          runtimePlugins: ['./single-runtime-plugin.js'],
        }),
      ]);
    },
  },
  plugins: [appTools()],
});
