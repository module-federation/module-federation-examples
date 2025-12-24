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
    // Use rspack to avoid webpack schema incompatibilities during package refreshes.
    appTools({ bundler: 'experimental-rspack' }),
    // Pass MF config directly to avoid relying on external module-federation config files.
    moduleFederationPlugin({
      config: {
        name: 'app2',
        remotes: {
          app1: 'app1@http://localhost:3001/mf-manifest.json',
        },
        exposes: {
          './Button': './src/components/button.js',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
        dts: false,
      },
    })
  ],
});
