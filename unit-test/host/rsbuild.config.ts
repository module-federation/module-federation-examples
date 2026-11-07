import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack'
//@ts-ignore
import mfConfig from './modulefederation.config';

export default defineConfig({
  server: {
    port: 3000,
  },
  output: {
    target: 'node',
    // Rsbuild 2 defaults Node output to ESM; this test harness loads the
    // emitted remoteEntry through require(), so keep the v1 CommonJS output.
    module: false,
    minify: true,
  },
  plugins: [pluginReact()],
  tools: {
    rspack: (config, { appendPlugins }) => {
      appendPlugins([
        new ModuleFederationPlugin(mfConfig),
      ]);
    },
  },
});
