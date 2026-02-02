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
    port: 3007,
  },
  plugins: [
    appTools({ bundler: 'experimental-rspack' }),
    moduleFederationPlugin({
      config: {
        name: 'consumer',
        shareStrategy: 'loaded-first',
        remotes: {
          remote: 'provider@http://localhost:3006/mf-manifest.json',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      },
    }),
  ],
});
