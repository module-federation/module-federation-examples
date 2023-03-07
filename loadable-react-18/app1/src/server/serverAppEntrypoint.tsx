import type { RenderAndExtractContextOptions } from './renderAndExtractContext';

// This file is used as a proxy to dynamic
// import the server render function
// and avoid eager consumption errors
export async function renderAndExtractContext({
  // express objects
  // req,
  // @loadable chunk extractor
  chunkExtractor,
}: RenderAndExtractContextOptions) {
  const { renderAndExtractContext } = await import('./renderAndExtractContext');
  return await renderAndExtractContext({ chunkExtractor });
}
