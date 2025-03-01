import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  entry: {
    main: './src/index.jsx',
    app: './src/app.jsx',
  },
  html: {
    scriptLoading: 'module',
  },
  dev: {
    writeToDisk: true,
  },
  tools: {
    rspack: {
      experiments: {
        outputModule: true,
      },
      externalsType: 'module',
      output: {
        chunkFormat: 'module',
        chunkLoading: 'import',
        workerChunkLoading: 'import',
        wasmLoading: 'fetch',
        library: { type: 'module' },
        module: true,
      },
      optimization: {
        runtimeChunk: 'single',
      },
    },
  },
  plugins: [
    pluginReact({ splitChunks: { react: false, router: false } }),
    pluginModuleFederation({
      name: 'host',
      remoteType: 'module',
      remotes: {
        remote: 'http://localhost:3001/static/remoteEntry.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
});
