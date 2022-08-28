import esbuild from "esbuild";
import serve, { error, log } from "create-serve";

const isDevServer = process.argv.includes("--dev");

export async function buildProject(projectName) {
  esbuild
    .build({
      entryPoints: ["src/index.tsx"],
      bundle: true,
      outfile: "www/dist/bundle.js",
      minify: !isDevServer,
      sourcemap: true,
      incremental: isDevServer,
      target: ["chrome58", "firefox57", "safari11", "edge18"],
      define: {
        "process.env.NODE_ENV": isDevServer ? '"development"' : '"production"',
      },
      watch: isDevServer && {
        onRebuild(err) {
          serve.update();
          err ? error("❌ Failed") : log("✅ Updated");
        },
      },
    })
    .catch(() => process.exit(1));

  if (isDevServer) {
    serve.start({
      port: 5000,
      root: "./www",
      live: true,
    });
  }
}

buildProject();
