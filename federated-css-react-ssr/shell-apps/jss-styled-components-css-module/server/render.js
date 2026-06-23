import React from 'react';
import { renderToString } from 'react-dom/server';
import Compose from '../src/ComposeProviders';
import { ServerStyleSheet } from 'styled-components';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { Helmet } from 'react-helmet';

export default async function (req, res) {
  const [
    { default: Content1 },
    { default: Content2 },
    { default: Content3 },
    { default: LoaderContext1 },
  ] = await Promise.all([
    import('expose_styled_component/Content'),
    import('expose_jss/Content'),
    import('expose_css_module/Content'),
    import('expose_css_module/LoaderContext'),
  ]);

  const css = new Set();
  const insertCss = (...styles) => {
    styles.forEach(style => css.add(style._getCss()));
  };
  const sheets = new SheetsRegistry();

  const combinedProviders = [[JssProvider, { registry: sheets }]].concat(
    [LoaderContext1.StyleContext.Provider].map(p => [p, { value: { insertCss } }]),
  );
  const sheet = new ServerStyleSheet();
  let styleTags;

  const component = renderToString(
    sheet.collectStyles(
      <Compose providers={combinedProviders}>
        <div>
          <Helmet>
            <title>SSR MF Example</title>
          </Helmet>
          <Content1 />
          <Content2 />
          <Content3 />
        </div>
      </Compose>,
    ),
  );
  styleTags = sheet.getStyleTags();

  const html = `<!doctype html>
    <html>
      <head>
        <style>${[...css].join('')}</style>
        ${styleTags}
        <style type="text/css" id="server-side-styles">
            ${sheets.toString()}
          </style>
      </head>
      <body>
        <div id="root">${component}</div>
        <script async data-chunk="main" src="http://localhost:4003/static/main.js"></script>
      </body>
    </html>`;
  res.status(200).send(html);
}
