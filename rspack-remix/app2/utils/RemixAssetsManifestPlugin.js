import {toManifest, writeManifest} from "./manifest.js";

class RemixAssetsManifestPlugin {
  constructor(remixConfig) {
    this.remixConfig = remixConfig;
  }
  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.emit.tapPromise(
      "RemixAssetsManifest",
      async (compilation) => {
        const stats = compilation.getStats();
        const manifest = await toManifest(this.remixConfig, stats);
        writeManifest(this.remixConfig, manifest);
      }
    );
  }
}

export {RemixAssetsManifestPlugin}
