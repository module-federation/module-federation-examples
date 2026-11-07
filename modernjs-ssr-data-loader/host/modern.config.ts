import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js-v3';

export default defineConfig({
  server: {
    port: 3062,
    ssr: { mode: 'stream' },
  },
  output: { assetPrefix: 'http://127.0.0.1:3062/' },
  plugins: [appTools(), moduleFederationPlugin()],
});
