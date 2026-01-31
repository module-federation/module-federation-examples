import React from 'react';
import { renderToString } from 'react-dom/server';
import Compose from '../src/ComposeProviders';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { Helmet } from 'react-helmet';

export default async function (req, res) {
  const [{ default: Content1 }, { default: Content2 }, { default: LoaderContext1 }] = await Promise.all([
    import('expose_css/Content'),
    import('expose_jss/Content'),
    import('expose_css/LoaderContext'),
  ]);

  const css = new Set();
  const insertCss = (...styles) => {
    styles.forEach(style => css.add(style._getCss()));
  };

  const sheets = new SheetsRegistry();

  const combinedProviders = [[JssProvider, { registry: sheets }]].concat(
    [LoaderContext1.StyleContext.Provider].map(p => [p, { value: { insertCss } }]),
  );

  const component = renderToString(
    <Compose providers={combinedProviders}>
      <div>
        <Helmet>
          <title>SSR MF Example</title>
        </Helmet>
        <Content1 />
        <Content2 />
      </div>
    </Compose>,
  );

  const html = `<!doctype html>
    <html>
      <head>
        <style>${[...css].join('')}</style>
        <style type="text/css" id="server-side-styles">
            ${sheets.toString()}
          </style>
      </head>
      <body>
        <div id="root">${component}</div>
        <script async data-chunk="main" src="http://localhost:4000/static/main.js"></script>
      </body>
    </html>`;
  res.status(200).send(html);
}
