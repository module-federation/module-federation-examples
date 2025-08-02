import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 3002,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: true,
    client: {
      port: 3002
    }
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'app2';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'remote2',
          exposes: {
            './button': './src/button.tsx',
          },
          shared: ['react', 'react-dom'],
        }),
      ]);
    },
  },
  plugins: [
    pluginReact({
      splitChunks: {
        react: false,
        router: false,
      },
    }),
  ],
});
