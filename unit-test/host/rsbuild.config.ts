import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack'
//@ts-ignore
import mfConfig from './modulefederation.config';
import rspack from '@rspack/core';

const rsbuildPlugin = () => ({
  name: 'example',
  setup(api) {
    api.onAfterBuild(() => console.log('done'));
  },
});

export default defineConfig({
  server: {
    port: 3000,
  },
  output: {
    targets: ['node'],
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
