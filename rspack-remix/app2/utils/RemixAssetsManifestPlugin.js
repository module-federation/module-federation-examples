import {toManifest, writeManifest} from "./manifest.js";

class RemixAssetsManifestPlugin {
  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.emit.tapPromise(
      "RemixAssetsManifest",
      async (compilation) => {
        const stats = compilation.getStats();
        const manifest = await toManifest(remixConfig, stats);
        writeManifest(remixConfig, manifest);
      }
    );
  }
}

export {RemixAssetsManifestPlugin}
