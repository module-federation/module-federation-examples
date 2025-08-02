import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  html: {
    scriptLoading: 'module',
  },
  source: {


    entry: {
      main: './src/index.js',
      other: {
        import: './src/other.jsx'
      },
      bs: './src/bootstrap.jsx',
    },
  },
  server: {
    port: 3001,
  },
  dev: {
    writeToDisk: true,
  },
  tools: {
    rspack: {
      experiments: {
        outputModule: true,
        topLevelAwait: true

      },
      externalsType: 'module',
      output: {
        chunkFormat: 'module',
        chunkLoading: 'import',
        workerChunkLoading: 'import',
        wasmLoading: 'fetch',
        library: { type: 'module' },
        module: true,
        asyncChunks: true
      },
      optimization: {
        runtimeChunk: 'single',
      },
    },
  },
  plugins: [
    pluginReact({ splitChunks: { react: false, router: false } }),
    pluginModuleFederation({
      name: 'remote',
      runtime: false,
      filename: 'static/remoteEntry.js',
      library: {
        type: 'module',
      },
      exposes: {
        './App': './src/App.jsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
});
