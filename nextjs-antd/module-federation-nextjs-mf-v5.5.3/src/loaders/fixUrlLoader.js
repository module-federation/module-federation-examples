"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixUrlLoader = void 0;
/**
 * This loader was specially created for tunning url-loader result
 *
 * And injects PUBLIC_PATH to it from webpack runtime
 *   `export default __webpack_require__.p + "/static/media/ssl.e3019f0e.svg"`
 *
 * __webpack_require__.p - is a global variable in webpack container which contains publicPath
 *   For example:  http://localhost:3000/_next
 *
 * @type {(this: import("webpack").LoaderContext<{}>, content: string) => string>}
 */
function fixUrlLoader(content) {
    // replace(/(.+\:\/\/[^\/]+){0,1}\/.*/i, '$1')
    //    this regexp will extract the hostname from publicPath
    //    http://localhost:3000/_next/... -> http://localhost:3000
    const currentHostnameCode = "__webpack_require__.p.replace(/(.+\\:\\/\\/[^\\/]+){0,1}\\/.*/i, '$1')";
    return content.replace('export default "/', `export default ${currentHostnameCode}+"/`);
}
exports.fixUrlLoader = fixUrlLoader;
// module.exports = fixUrlLoader;
exports.default = fixUrlLoader;
//# sourceMappingURL=fixUrlLoader.js.map