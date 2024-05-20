import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
//@ts-ignore
import mfConfig from './modulefederation.config';

export default defineConfig({
  server: {
    port: 3000,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      appendPlugins([
        new ModuleFederationPlugin(mfConfig),
      ]);
    },
  },
  plugins: [pluginReact()],
});
