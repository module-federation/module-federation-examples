import React from 'react';
import { renderToString } from 'react-dom/server';
import Compose from '../src/ComposeProviders';
import { Helmet } from 'react-helmet';

export default async function (req, res) {
  const [
    { default: Content1 },
    { default: Content2 },
    { default: LoaderContext1 },
    { default: LoaderContext2 },
  ] = await Promise.all([
    import('expose_css/Content'),
    import('expose_scss/Content'),
    import('expose_css/LoaderContext'),
    import('expose_scss/LoaderContext'),
  ]);

  const css = new Set();
  const insertCss = (...styles) => {
    styles.forEach(style => css.add(style._getCss()));
  };

  const component = renderToString(
    <Compose
      providers={[LoaderContext1.StyleContext.Provider, LoaderContext2.StyleContext.Provider].map(p => [
        p,
        { value: { insertCss } },
      ])}
    >
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
      </head>
      <body>
        <div id="root">${component}</div>
        <script async data-chunk="main" src="http://localhost:4001/static/main.js"></script>
      </body>
    </html>`;
  res.status(200).send(html);
}
