import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  server: {
    port: 3001,
  },
  dev: {
    // set publicPath
    assetPrefix: 'http://localhost:3001/',
  },
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    moduleFederationPlugin({
      config: {
        name: 'host',
        shareStrategy: 'loaded-first',
        remotes: {
          provider: 'provider@http://localhost:3002/static/js/remoteEntry.js',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      },
    }),
  ],
});
