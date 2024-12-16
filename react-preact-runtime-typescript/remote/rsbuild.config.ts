import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginPreact } from '@rsbuild/plugin-preact';

export default defineConfig({
  plugins: [
    pluginPreact(),
    pluginModuleFederation({
      name: 'remote',
      exposes: {
        './appInjector': './src/appInjector',
      },
    }),
  ],
  server: {
    port: 3002,
  },
  tools: {
    rspack: {
      output: {
        uniqueName: 'remote',
        publicPath: 'auto',
      },
    },
  },
});
