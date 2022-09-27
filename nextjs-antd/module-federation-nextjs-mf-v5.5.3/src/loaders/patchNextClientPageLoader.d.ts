import type { LoaderContext } from 'webpack';
/**
 * This webpack loader patches next/dist/client/page-loader.js file.
 * Also it requires `include-defaults.js` with required shared libs
 *
 */
export default function patchNextClientPageLoader(this: LoaderContext<Record<string, unknown>>, content: string): string;
