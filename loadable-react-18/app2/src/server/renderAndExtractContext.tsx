import React from 'react';
// import { Request } from 'express';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { renderToString } from 'react-dom/server';

// import App from '../client/components/App';

export type RenderAndExtractContextOptions = {
  // req: Request;
  chunkExtractor: ChunkExtractor;
};
export type RenderAndExtractContextResult = {
  markup: string;
  linkTags: string;
  scriptTags: string;
};

export type RenderAndExtractContextFunction = (
  options: RenderAndExtractContextOptions,
) => Promise<RenderAndExtractContextResult>;

export async function renderAndExtractContext({
  // express objects
  // req,
  // @loadable chunk extractor
  chunkExtractor,
}: RenderAndExtractContextOptions) {
  const { default: App } = await import('../client/components/App');

  // ================ WORKAROUND ================
  // This not work, The ChunkExtractorManager context provider
  // do not pass the chunkExtractor to the context consumer (ChunkExtractorManager)
  // const markup = await renderToString(chunkExtractor.collectChunks(<App />));

  const markup = renderToString(
    <ChunkExtractorManager {...{ extractor: chunkExtractor }}>
      <App />,
    </ChunkExtractorManager>,
  );
  // ================ WORKAROUND ================

  const linkTags = chunkExtractor.getLinkTags();
  const scriptTags = chunkExtractor.getScriptTags();

  return {
    markup,
    linkTags,
    scriptTags,
  };
}
