import esbuild from "esbuild";
import serve, { error, log } from "create-serve";
import { esbuildAdapter } from './build/esbuild-adapter.mjs';
import { federationBuilder } from '@softarc/native-federation/build.js';
import path from "path";
import fs from "fs";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const isDevServer = process.argv.includes("--dev");

export async function buildProject(projectName) {

  const tsConfig = 'tsconfig.json';
  const outputPath = `www/dist`;

  /*
      *  Step 1: Initialize Native Federation
  */

  await federationBuilder.init({
    options: {
      workspaceRoot: path.join(__dirname, '..'),
      outputPath,
      tsConfig,
      federationConfig: `${projectName}/federation.config.js`,
      verbose: false,
    },

    /*
        * As this core lib is tooling-agnostic, you
        * need a simple adapter for your bundler.
        * It's just a matter of one function.
    */
    adapter: esbuildAdapter
  });

  /*
      *  Step 2: Trigger your build process
  *
      *      You can use any tool for this. Here, we go with a very
      *      simple esbuild-based build.
      *
      *      Just respect the externals in `federationBuilder.externals`.
  */

  fs.rmSync(outputPath, { force: true, recursive: true });

  await esbuild.build({
    entryPoints: ["src/index.tsx"],
    external: federationBuilder.externals,
    outdir: outputPath,
    bundle: true,
    platform: 'browser',
    format: 'esm',
    mainFields: ['es2020', 'browser', 'module', 'main'],
    conditions: ['es2020', 'es2015', 'module'],
    resolveExtensions: ['.ts', '.tsx', '.mjs', '.js'],
    tsconfig: tsConfig,
    splitting: true,
    define: {
      "process.env.NODE_ENV": isDevServer ? '"development"' : '"production"',
    },
    watch: isDevServer && {
      onRebuild(err) {
        serve.update();
        err ? error("❌ Failed") : log("✅ Updated");
      },
    },
  }).catch(() => process.exit(1));
  // esbuild
  //   .build({
  //     // entryPoints: ["src/index.tsx"],
  //     // bundle: true,
  //     // outfile: "www/dist/bundle.js",
  //     // minify: !isDevServer,
  //     // sourcemap: true,
  //     // incremental: isDevServer,
  //     // target: ["chrome58", "firefox57", "safari11", "edge18"],
  //     // define: {
  //     //   "process.env.NODE_ENV": isDevServer ? '"development"' : '"production"',
  //     // },
  //     // watch: isDevServer && {
  //     //   onRebuild(err) {
  //     //     serve.update();
  //     //     err ? error("❌ Failed") : log("✅ Updated");
  //     //   },
  //     // },
  //   })
  //   .catch(() => process.exit(1));

  if (isDevServer) {
    serve.start({
      port: 5000,
      root: "./www",
      live: true,
    });
  }
}

buildProject('app1');
