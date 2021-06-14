const ConcatSource = require("webpack-sources/lib/ConcatSource");

const PLUGIN_NAME = "ModuleFedSingleRuntimePlugin";

/**
 * Merge a runtime with your remote entry.
 */
class ModuleFedSingleRuntimePlugin {
  /**
   * @param {object} options
   * @param {string} [options.fileName= remoteEntry.js] The file name to concat the runtime with
   * @param {string} [options.runtime= webpack] The runtime to merge
   */
  constructor(options) {
    this._options = {
      fileName: "remoteEntry.js",
      runtime: "webpack",
      ...options,
    };
  }

  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    if (!this._options) return null;
    const options = this._options;

    // Specify the event hook to attach to
    compiler.hooks.thisCompilation.tap(
      "EnableSingleRunTimeForFederationPlugin",
      (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: "EnableSingleRunTimeForFederationPlugin",
            stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
          },
          (assets) => {
            const assetArray = Object.keys(assets);
            let runtimePath = assetArray.find((asset) => {
              return asset.includes(this._options.runtime);
            });
            let remoteEntryPath = assetArray.find((asset) => {
              return asset.includes(this._options.fileName);
            });

            compilation.emitAsset(
              "static/chunks/webpack-runtime.js",
              new ConcatSource(
                compilation.getAsset(runtimePath).source.buffer().toString()
                // compilation.getAsset(remoteEntryPath).source.buffer().toString()
              )
            );
            // compilation.updateAsset(
            //   remoteEntryPath,
            //   new ConcatSource(
            //     compilation.getAsset(runtimePath).source.buffer().toString(),
            //     compilation.getAsset(remoteEntryPath).source.buffer().toString()
            //   )
            // );
          }
        );
      }
    );
  }
}

module.exports = ModuleFedSingleRuntimePlugin;
