import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
//@ts-ignore
import mfConfig from './modulefederation.config';
import rspack from '@rspack/core';
export default defineConfig({
  server: {
    port: 3002,
  },
  tools: {
    rspack: {
      plugins: [new rspack.container.ModuleFederationPlugin(mfConfig)],
    },
  },
  plugins: [pluginReact()],
});
