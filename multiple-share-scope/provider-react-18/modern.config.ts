import { appTools, defineConfig } from '@modern-js/app-tools';
import pluginMF from '@module-federation/modern-js';

export default defineConfig({
  runtime: {
    router: true,
  },
  devtools: false,
  server: {
    port: 8082,
  },
  tools: {
    less: {
      lessOptions: {
        math: 'always',
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    appTools({
      bundler: 'webpack', // Set to 'webpack' to enable webpack
    }),
    pluginMF(),
  ],
});
