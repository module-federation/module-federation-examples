"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveRRRuntimePlugin = void 0;
const webpack_1 = require("webpack");
class RemoveRRRuntimePlugin {
    apply(compiler) {
        const webpack = compiler.webpack;
        // only impacts dev mode - dont waste the memory during prod build
        if (compiler.options.mode === 'development') {
            compiler.hooks.thisCompilation.tap('RemoveRRRuntimePlugin', (compilation) => {
                compilation.hooks.processAssets.tap({
                    name: 'RemoveRRRuntimePlugin',
                    // FIXME: Is this state or stage?
                    // Webpack docs mentions it as 'stage'.
                    stage: webpack_1.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
                }, (assets) => {
                    //can this be improved? I need react refresh not to cause global collision in dev mode
                    Object.keys(assets).forEach((filename) => {
                        if (filename.endsWith('.js') || filename.endsWith('.mjs')) {
                            const asset = compilation.getAsset(filename);
                            // easiest way to solve it is to prevent react refresh helpers from running when its a federated module chunk
                            const newSource = asset?.source.source().replace(/RefreshHelpers/g, 'NoExist');
                            const updatedAsset = new webpack.sources.RawSource(newSource);
                            if (asset) {
                                compilation.updateAsset(filename, updatedAsset);
                            }
                            else {
                                compilation.emitAsset(filename, updatedAsset);
                            }
                        }
                    });
                });
            });
        }
    }
}
exports.RemoveRRRuntimePlugin = RemoveRRRuntimePlugin;
exports.default = RemoveRRRuntimePlugin;
//# sourceMappingURL=RemoveRRRuntimePlugin.js.map