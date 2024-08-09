import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
//@ts-ignore
import mfConfig from './modulefederation.config';

export default defineConfig({
  server: {
    port: 3002,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output.publicPath = 'auto';
      appendPlugins([new ModuleFederationPlugin(mfConfig)]);
    },
  },
  plugins: [pluginReact({
    splitChunks: {
      router: false,
      react: false
    }
  })],
});
