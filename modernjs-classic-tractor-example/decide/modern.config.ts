import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  server: {
    port: 3002,
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    moduleFederationPlugin({
      config: {
        name: 'decide',
        shareStrategy: 'loaded-first',
        runtime: false,
        filename: 'static/js/remoteEntry.js',
        remotes: {
          explore: 'explore@http://localhost:3000/static/js/remoteEntry.js',
          checkout: 'checkout@http://localhost:3001/static/js/remoteEntry.js',
        },
        exposes: {
          './ProductPage': './src/routes/product/[id]/page.js',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
          '@modern-js/runtime/router': { singleton: true },
        },
      },
    }),
  ],
  tools: {
    rspack: (config) => {
      // @ts-expect-error
      config.output.publicPath = 'auto';
      // @ts-expect-error
      config.output.uniqueName = 'decide';
      delete config.optimization?.splitChunks;
    },
  },
});
