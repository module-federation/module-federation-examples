import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(async ({ command }) => ({
  server: {
    fs: {
      allow: [".", "../shared"],
    },
    proxy: { "/src/remote_assets": "http://localhost:4174/" },
  },
  resolve: {
    alias: {
      vue: path.resolve(
        __dirname,
        "./node_modules/vue/dist/vue.runtime.esm-bundler.js",
      ),
      pinia: path.resolve(__dirname, "./node_modules/pinia/dist/pinia.mjs"),
      shared: path.resolve(__dirname, "../shared/shared"),
    },
  },
  build: {
    target: "chrome89",
  },
  plugins: [
    federation({
      name: "host",
      remotes: {
        remote: {
          type: "module",
          name: "remote",
          entry: "http://localhost:4174/remoteEntry.js",
          entryGlobalName: "remote",
          shareScope: "default",
        },
      },
      exposes: {},
      filename: "remoteEntry.js",
    }),
    vue(),
    vueJsx(),
  ],
}));
