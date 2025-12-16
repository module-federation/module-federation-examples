import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
//@ts-ignore
import mfConfig from './modulefederation.config';
export default defineConfig({
  server: {
    port: 3002,
    strictPort: true,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      ...mfConfig,
      experiments: {
        asyncStartup: true,
      },
    }),
  ],
  tools: {
    rspack: {
      output: {
        publicPath: 'auto',
      },
    },
  },
});
