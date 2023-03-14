import type { RenderAndExtractContextOptions } from './renderAndExtractContext';

// This file is used as a proxy to dynamic
// import the server render function
// and avoid eager consumption errors
export async function renderAndExtractContext(options: RenderAndExtractContextOptions) {
  const { renderAndExtractContext } = await import('./renderAndExtractContext');
  return await renderAndExtractContext(options);
}
