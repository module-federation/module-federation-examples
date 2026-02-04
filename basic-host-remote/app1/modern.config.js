import appTools, { defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  server: {
    port: 3001,
  },
  runtime: {
    router: true,
  },
  tools: {
    webpack: (config) => {
      delete config.optimization.splitChunks;
      config.output.publicPath = 'auto';
    },
  },
  plugins: [
    appTools(),
    moduleFederationPlugin({
      config: {
        name: 'app1',
        shareStrategy: 'loaded-first',
        remotes: {
          app2: 'app2@http://localhost:3002/static/js/remoteEntry.js',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      },
    }),
  ],
});
