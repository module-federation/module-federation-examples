import type { LoaderContext } from 'webpack';
/**
 * This loader was specially created for tunning next-image-loader result
 *   see https://github.com/vercel/next.js/blob/canary/packages/next/build/webpack/loaders/next-image-loader.js
 * It takes regular string
 *   `export default {"src":"/_next/static/media/ssl.e3019f0e.svg","height":20,"width":20};`
 * And injects PUBLIC_PATH to it from webpack
 *   `export default {"src":__webpack_require__.p+"/static/media/ssl.e3019f0e.svg","height":20,"width":20};`
 *
 *
 * __webpack_require__.p - is a global variable in webpack container which contains publicPath
 *   For example:  http://localhost:3000/_next
 *
 */
export declare function fixImageLoader(this: LoaderContext<Record<string, unknown>>, remaining: string): Promise<string>;
export declare const pitch: typeof fixImageLoader;
