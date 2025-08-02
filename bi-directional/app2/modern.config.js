import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  dev: { 
    port: 3002,
  },
  server: {
    port: 3002,
    ssr: false, // Disable SSR completely for client-side rendering
  },
  runtime: {
    router: true,
  },
  source: {
    enableAsyncEntry: true, // Ensure async entry for module federation
  },
  tools: {
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    },
  },
  plugins: [
    appTools(), 
    moduleFederationPlugin()
  ],
});
