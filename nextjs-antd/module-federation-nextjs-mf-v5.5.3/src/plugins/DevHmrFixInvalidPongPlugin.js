"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevHmrFixInvalidPongPlugin = void 0;
const webpack_1 = require("webpack");
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (str, newStr) {
        // If a regex pattern
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
        }
        // If a string
        return this.replace(new RegExp(str, 'g'), newStr);
    };
}
/**
 * If HMR through websocket received {"invalid":true, "event":"pong"} event
 *   then pages reloads. But for federated page this is unwanted behavior.
 *
 * So this plugin in DEV mode disables page.reload() in HMR for federated pages.
 */
class DevHmrFixInvalidPongPlugin {
    apply(compiler) {
        const webpack = compiler.webpack;
        compiler.hooks.thisCompilation.tap('DevHmrFixInvalidPongPlugin', (compilation) => {
            compilation.hooks.processAssets.tap({
                name: 'DevHmrFixInvalidPongPlugin',
                // FIXME: Is this state or stage?
                // Webpack docs mentions it as 'stage'.
                stage: webpack_1.Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS,
            }, (assets) => {
                Object.keys(assets).forEach((filename) => {
                    if (filename.endsWith('/main.js')) {
                        const asset = compilation.getAsset(filename);
                        const newSource = asset?.source.source().replace(new RegExp(escapeRegExp('if (payload.event === \\"pong\\" && payload.invalid && !self.__NEXT_DATA__.err) {'), 'g'), `if (payload.event === \\"pong\\" && payload.invalid && !self.__NEXT_DATA__.err) {
                    if (window.mf_client &&  window.mf_client.isFederatedPathname(window.location.pathname)) return;
                  `.replaceAll('\n', '\\n'));
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
exports.DevHmrFixInvalidPongPlugin = DevHmrFixInvalidPongPlugin;
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
exports.default = DevHmrFixInvalidPongPlugin;
//# sourceMappingURL=DevHmrFixInvalidPongPlugin.js.map