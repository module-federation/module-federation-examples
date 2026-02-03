import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  server: {
    port: 3001,
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    moduleFederationPlugin({
      config: {
        name: 'checkout',
        shareStrategy: 'loaded-first',
        runtime: false,
        filename: 'static/js/remoteEntry.js',
        remotes: {
          explore: 'explore@http://localhost:3000/static/js/remoteEntry.js',
        },
        exposes: {
          './MiniCart': './src/components/MiniCart',
          './AddToCart': './src/components/AddToCart',
          './CartPage': './src/routes/checkout/cart/page.js',
          './ThankYouPage': './src/routes/checkout/thanks/page.js',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
          '@modern-js/runtime/': { singleton: true },
        },
      },
    }),
  ],
  tools: {
    rspack: (config) => {
      // @ts-expect-error
      config.output.publicPath = 'auto';
      delete config.optimization?.splitChunks;
    },
  },
});
