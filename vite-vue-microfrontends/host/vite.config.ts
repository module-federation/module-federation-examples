import { federation } from "@module-federation/vite";
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(async ({ command }) => ({
  server: {
    fs: {
      allow: [".", "../shared"],
    },
  },
  resolve:
    command === "serve"
      ? {
          alias: {
            vue: path.resolve(
              __dirname,
              "./node_modules/vue/dist/vue.runtime.esm-bundler.js"
            ),
            pinia: path.resolve(
              __dirname,
              "./node_modules/pinia/dist/pinia.mjs"
            ),
            shared: path.resolve(__dirname, "../shared/shared"),
          },
        }
      : {},
  plugins: [
    await federation({
      options: {
        workspaceRoot: __dirname,
        outputPath: "dist",
        tsConfig: "tsconfig.json",
        federationConfig: "module-federation/federation.config.cjs",
        verbose: false,
        dev: command === "serve",
      },
      adapter: createEsBuildAdapter({ plugins: [] }),
    }),
    vue(),
    vueJsx(),
  ],
}));
