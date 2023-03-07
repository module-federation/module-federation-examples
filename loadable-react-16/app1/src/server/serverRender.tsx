import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import {
  RenderAndExtractContextFunction,
  RenderAndExtractContextResult,
} from './renderAndExtractContext';
import { getLoadableRequiredComponents } from './mfFunctions';

export default async function serverRender(req, res, next) {
  const nodeExtractor = new ChunkExtractor({
    statsFile: path.resolve(path.join(process.cwd(), 'dist/server'), 'loadable-stats.json'),
    entrypoints: ['serverAppEntrypoint'],
  });
  const clientExtractor = new ChunkExtractor({
    statsFile: path.resolve(path.join(process.cwd(), 'dist/client'), 'loadable-stats.json'),
    entrypoints: ['clientAppEntrypoint'],
  });

  res.statusCode = 200;
  res.setHeader('Content-type', 'text/html');
  res.write('<!DOCTYPE html>');
  res.write('<html>');

  const entrypoint = nodeExtractor.requireEntrypoint();

  let renderAndExtractContext = entrypoint[
    'renderAndExtractContext'
  ] as RenderAndExtractContextFunction;

  // TODO: investigate why nodeExtractor is not returning the function and remove this fallback
  if (!renderAndExtractContext) {
    console.warn('renderAndExtractContext is undefined - trying to get it from default');
    renderAndExtractContext = (await import('./serverAppEntrypoint')).renderAndExtractContext;
  }

  const result = await renderAndExtractContext({
    // req,
    chunkExtractor: clientExtractor,
  });

  console.log(
    'getLoadableRequiredComponents nodeExtractor',
    getLoadableRequiredComponents(nodeExtractor),
  );
  console.log(
    'getLoadableRequiredComponents clientExtractor',
    getLoadableRequiredComponents(clientExtractor),
  );

  const { markup, linkTags, scriptTags } = result as RenderAndExtractContextResult;

  res.write(`<head>${linkTags}</head><body>`);
  res.write(`<div id="root">${markup}</div>`);

  res.write(scriptTags);
  res.write('</body></html>');
  res.send();

  next();
}
