import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export type RenderAndExtractContextOptions = {};

export type RenderAndExtractContextResult = {
  markup: string;
  linkTags: string;
  scriptTags: string;
};

export type RenderAndExtractContextFunction = (
  options: RenderAndExtractContextOptions,
) => Promise<RenderAndExtractContextResult>;

export async function renderAndExtractContext(options: RenderAndExtractContextOptions) {
  const { default: App } = await import('../client/components/App');

  const sheet = new ServerStyleSheet();

  const markup = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <App />
    </StyleSheetManager>,
  );

  const linkTags = sheet.getStyleTags();

  sheet.seal();

  const scriptTags = `<script type='text/javascript' src='/static/clientAppEntrypoint.js'></script>`;

  return {
    markup,
    linkTags,
    scriptTags,
  };
}
