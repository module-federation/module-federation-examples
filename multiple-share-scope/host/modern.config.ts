import { appTools, defineConfig } from '@modern-js/app-tools';
import pluginMF from '@module-federation/modern-js';

export default defineConfig({
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      bundler: 'webpack', // Set to 'webpack' to enable webpack
    }),
    pluginMF(),
  ],
});
