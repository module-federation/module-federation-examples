import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    federation({
      filename: 'remoteEntry.js',
      name: 'remote',
      exposes: {
        './remote-app': './src/App.tsx',
      },
      remotes: {},
      shared: {
        "solid-js": {
          requiredVersion: dependencies['solid-js'],
          singleton: true,
        },
      },
    }),
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
