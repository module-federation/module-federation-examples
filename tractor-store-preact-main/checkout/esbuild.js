const esbuild = require("esbuild");
const cssModulesPlugin = require("esbuild-plugin-css-modules");

// Function to build both client and server
const buildBoth = async (watch = false, minify = false) => {
  const options = {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    bundle: true,
    minify,
    logLevel: "info",
    color: false,
    plugins: [
      // add team prefix to css class names
      // use native esbuild support when ready https://github.com/evanw/esbuild/issues/3484
      cssModulesPlugin({ localIdentName: "ch_[local]--[hash]" }),
    ],
  };

  const clientOptions = {
    entryPoints: ["src/client/index.jsx"],
    outfile: "public/checkout/static/client.js",
    platform: "browser",
    loader: { ".jsx": "jsx" },
    ...options,
  };

  const serverOptions = {
    entryPoints: ["src/server/index.node.js"],
    outfile: "dist/server.node.js",
    platform: "node",
    ...options,
  };

  try {
    await esbuild.build(clientOptions);
    await esbuild.build(serverOptions);
  } catch (e) {
    console.log("initial build failed", e);
  }

  if (watch) {
    const client = await esbuild.context(clientOptions);
    await client.watch();
    const server = await esbuild.context(serverOptions);
    await server.watch();
  }
};

// Handling CLI arguments
const main = async () => {
  const watch = process.argv.includes("--watch");
  const minify = process.argv.includes("--minify");
  await buildBoth(watch, minify);
};

main();
