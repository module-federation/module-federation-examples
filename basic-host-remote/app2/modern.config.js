import appTools, { defineConfig } from '@modern-js/app-tools';
import { ModuleFederationPlugin } from '@module-federation/enhanced';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  server: {
    port: 3002,
  },
  runtime: {
    router: true,
  },
  source: {
    // automatically generated asynchronous boundary via Dynamic Import, allowing the page code to consume remote modules generated by the module federation.
    enableAsyncEntry: true,
  },
  tools: {
    webpack: (config, { appendPlugins }) => {
      delete config.optimization.splitChunks;
      config.output.publicPath = 'auto';

      appendPlugins([
        new ModuleFederationPlugin({
          name: 'app2',
          library: { type: 'window', name: 'app2' },
          runtime: false,
          filename: 'static/js/remoteEntry.js',
          exposes: {
            './Button': './src/components/button.js',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
      ]);
    },
  },
  plugins: [appTools()],
});
