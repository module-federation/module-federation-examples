import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
//@ts-ignore
import mfConfig from './modulefederation.config';
export default defineConfig({
  server: {
    port: 3000,
  },
  moduleFederation: {
    options: {
      ...mfConfig,
      experiments: {
        asyncStartup: true,
      },
    },
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      output: {
        publicPath: 'auto',
      },
    },
  },
});
