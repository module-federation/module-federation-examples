import appTools, { defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  server: {
    port: 3002,
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
        name: 'app2',
        shareStrategy: 'loaded-first',
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
      },
    }),
  ],
});
