import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  server: {
    port: 3000,
  },
  output: {
    disableTsChecker: true,
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    moduleFederationPlugin({
      config: {
        name: 'explore',
        shareStrategy: 'loaded-first',
        filename: 'static/js/remoteEntry.js',
        remotes: {
          decide: 'decide@http://localhost:3002/static/js/remoteEntry.js',
          checkout: 'checkout@http://localhost:3001/static/js/remoteEntry.js',
        },
        exposes: {
          './Header': './src/components/Header',
          './Footer': './src/components/Footer',
          './Recommendations': './src/components/Recommendations',
          './StorePicker': './src/components/StorePicker',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
          '@modern-js/': { singleton: true },
        },
      },
    }),
  ],
  tools: {
    rspack: (config) => {
      // @ts-expect-error
      config.output.publicPath = 'auto';
      // @ts-expect-error
      config.output.uniqueName = 'explore';
      delete config.optimization?.splitChunks;
    },
  },
});
