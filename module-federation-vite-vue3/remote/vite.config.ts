import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { writeFileSync } from "fs";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(async ({ command, mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());
  return {
    server: {
      fs: {
        allow: [".", "../shared"],
      },
    },
    base: "http://localhost:4174",
    plugins: [
      {
        name: "generate-enviroment",
        options: function () {
          console.info("selfEnv", selfEnv);
          writeFileSync(
            "./src/enviroment.ts",
            `export default ${JSON.stringify(selfEnv, null, 2)};`
          );
        },
      },
      federation({
        filename: "remoteEntry.js",
        name: "remote",
        exposes: {
          "./remote-app": "./src/App.vue",
        },
        remotes: {},
      }),
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        vue: path.resolve(
          __dirname,
          "./node_modules/vue/dist/vue.runtime.esm-bundler.js"
        ),
        pinia: path.resolve(__dirname, "./node_modules/pinia/dist/pinia.mjs"),
        shared: path.resolve(__dirname, "../shared/shared"),
      },
    },
    build: {
      target: "chrome89",
    },
  };
});
