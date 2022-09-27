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
export declare function fixUrlLoader(content: string): string;
export default fixUrlLoader;
