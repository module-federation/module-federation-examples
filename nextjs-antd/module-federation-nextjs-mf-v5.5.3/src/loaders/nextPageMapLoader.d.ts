import type { LoaderContext } from 'webpack';
/**
 * Webpack loader which prepares MF map for NextJS pages
 *
 */
export default function nextPageMapLoader(this: LoaderContext<Record<string, unknown>>): void;
/**
 * Webpack config generator for `exposes` option.
 *   - automatically create `./pages-map` module
 *   - automatically add all page modules
 */
export declare function exposeNextjsPages(cwd: string): {
    './pages-map': string;
    './pages-map-v2': string;
};
