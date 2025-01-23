import appTools, { defineConfig } from '@modern-js/app-tools';
import { ModuleFederationPlugin, ContainerPlugin } from '@module-federation/enhanced';
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
        new ContainerPlugin({
          name: 'app1_partial',
          filename: 'static/js/app1_partial.js',
          exposes: {
            './Button': './src/components/button.js',
          },
          runtimePlugins: ['./single-runtime-plugin.js'],
        }),
        new ModuleFederationPlugin({
          name: 'app1',
          runtime: false,
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
