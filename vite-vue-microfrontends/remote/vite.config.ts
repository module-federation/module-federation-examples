import { federation } from "@module-federation/vite";
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import pluginVue from "esbuild-plugin-vue-next";
import { writeFileSync } from "fs";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(async ({ command, mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());
  return {
    server: {
      fs: {
        allow: [".", "../shared"],
      },
    },
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
      await federation({
        options: {
          workspaceRoot: __dirname,
          outputPath: "dist",
          tsConfig: "tsconfig.json",
          federationConfig: "module-federation/federation.config.cjs",
          verbose: true,
          dev: command === "serve",
        },
        adapter: createEsBuildAdapter({ plugins: [pluginVue()] }),
      }),
      vue(),
      vueJsx(),
    ],
  };
});
