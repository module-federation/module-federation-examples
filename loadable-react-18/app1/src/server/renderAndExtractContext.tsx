import React from 'react';
// import { Request } from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import { getMfChunks, createScriptTag, createStyleTag } from './mfFunctions';

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

  // This not work, The ChunkExtractorManager context provider
  // do not pass the chunkExtractor to the context consumer (ChunkExtractorManager)
  // const markup = await renderToString(chunkExtractor.collectChunks(<App />));

  const markup = await renderToStaticMarkup(
    <ChunkExtractorManager {...{ extractor: chunkExtractor }}>
      <App />
    </ChunkExtractorManager>,
  );

  const linkTags = chunkExtractor.getLinkTags();
  const scriptTags = chunkExtractor.getScriptTags();

  // ================ WORKAROUND ================
  const [mfRequiredScripts, mfRequiredStyles] = await getMfChunks(chunkExtractor);

  const mfScriptTags = mfRequiredScripts.map(createScriptTag).join('');
  const mfStyleTags = mfRequiredStyles.map(createStyleTag).join('');
  // ================ WORKAROUND ================

  console.log('mfScriptTags', mfScriptTags);
  console.log('mfStyleTags', mfStyleTags);

  return {
    markup,
    linkTags: `${mfStyleTags}${linkTags}`,
    scriptTags: `${mfScriptTags}${scriptTags}`,
    // linkTags: linkTags,
    // scriptTags: scriptTags,
  };
}
