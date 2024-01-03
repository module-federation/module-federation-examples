import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
//@ts-ignore
import mfConfig from './modulefederation.config';
import rspack from '@rspack/core';
export default defineConfig({
  server: {
    port: 3002,
  },
  source: {
    preEntry: false,
  },
  performance: {
    chunkSplit: {
      override: {
        chunks: 'async',
        minSize: 30000,
      },
    },
  },
  tools: {
    rspack: {
      output: {
        publicPath: 'auto',
      },
      plugins: [new rspack.container.ModuleFederationPlugin(mfConfig)],
    },
  },
  plugins: [pluginReact()],
});
