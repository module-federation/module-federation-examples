import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/components/App';
import Compose from '../src/ComposeProviders';
import providers from '../src/StyleProviders';

export default async function(req, res) {
    const css = new Set();
    const insertCss = (...styles) => {
        styles.forEach(style => css.add(style._getCss()));
    };

    const component = renderToString(
      <Compose providers={providers.map(p => [p, { value: { insertCss } }])}>
        <App />
      </Compose>
  );

    const html = `<!doctype html>
    <html>
      <head>
        <style>${[...css].join('')}</style>
      </head>
      <body>
        <div id="root">${component}</div>
        <script async data-chunk="main" src="http://localhost:4005/static/main.js"></script>
      </body>
    </html>`
    res.status(200).send(html);
};
