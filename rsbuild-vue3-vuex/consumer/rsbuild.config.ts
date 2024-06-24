import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
// import { pluginEslint } from '@rsbuild/plugin-eslint';
import path from "node:path";
import { dependencies } from "./package.json";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
  source: {
    entry: {
      index: "./src/main.js",
    },
  },
  server: {
    port: 3000,
  },
  output: {
    assetPrefix: '/',
    filenameHash: true,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      // Will work in dev only if set to "/"
      config.resolve ||= {};
      config.resolve.alias ||= {};
      config.output ||= {};
      // public
      config.resolve.alias["@"] = path.resolve(__dirname, "src");
      appendPlugins([
        new ModuleFederationPlugin({
          name: `ASSET_HOST`,
          filename: `ASSET_HOST__remoteEntry.js`,
          remotes: {
            "@remote": "ASSET_REMOTE@http://localhost:3001/remoteEntry.js",
          },
          shared: {
            vue: {
              singleton: true,
              requiredVersion: dependencies.vue,
            },
            vuex: {
              singleton: true,
              requiredVersion: dependencies.vuex,
            },
          },
        }),
      ]);
    },
  },
  plugins: [pluginVue({
    splitChunks: {
      vue: false,
      router: false
    }
  })],
});
