import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: 'node_modules/.cacheDir',
  plugins: [
    vue(),
    federation({
      name: 'vite-side',
      filename: 'remoteEntry.js',
      remotes: {
        'webpack-side': {
          external: 'http://localhost:5001/remoteEntry.js',
          format: 'esm',
          from: 'webpack',
        },
      },
      exposes: {
        './Content': {
          name: 'content',
          import: './src/components/Content.vue',
        },
      },
      shared: ['vue', 'vuex'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: 'assets/[name].js',
        minifyInternalExports: false,
      },
    },
  },
});
