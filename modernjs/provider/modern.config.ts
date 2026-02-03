import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  dev: {
    // set publicPath
    assetPrefix: 'http://localhost:3002/',
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
        name: 'provider',
        shareStrategy: 'loaded-first',
        library: { type: 'var', name: 'provider' },
        filename: 'static/js/remoteEntry.js',
        exposes: {
          './Button': './src/components/Button',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      },
    }),
  ],
});
