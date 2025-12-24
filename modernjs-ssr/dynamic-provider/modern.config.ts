import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  server: {
    ssr: {
      mode: 'stream',
    },
    port: 3008,
  },
  plugins: [
    appTools({ bundler: 'experimental-rspack' }),
    moduleFederationPlugin({
      config: {
        name: 'dynamic_provider',
        filename: 'remoteEntry.js',
        exposes: {
          './Image': './src/components/Image.tsx',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      },
    }),
  ],
});
