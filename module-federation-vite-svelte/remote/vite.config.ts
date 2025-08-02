import { federation } from "@module-federation/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    federation({
      filename: "remoteEntry.js",
      name: "remote",
      exposes: {
        "./remote-app": "./src/App.svelte",
      },
      remotes: {},
    }),
  ],
  build: {
    target: "chrome89",
  },
});
