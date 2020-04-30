import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { ChunkExtractor } from "@loadable/server";
import path from "path";
import App from "../src/components/App";

const statsFile = path.resolve("./buildClient/static/stats.json");

export default async (req, res, next) => {
  try {
    const extractor = new ChunkExtractor({ statsFile });
    // Wrap your application using "collectChunks"
    const jsx = extractor.collectChunks(createApp(App));

    // Render your application
    const html = renderToString(jsx);
    // You can now collect your script tags
    const scriptTags = extractor.getScriptTags(); // or extractor.getScriptElements();
    // You can also collect your "preload/prefetch" links
    const linkTags = extractor.getLinkTags(); // or extractor.getLinkElements();
    // And you can even collect your style tags (if you use "mini-css-extract-plugin")
    const styleTags = extractor.getStyleTags(); // or extractor.getStyleElements();
    const helmet = Helmet.renderStatic();

    return res.send(`<!doctype html>
     <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
          
            <link rel="shortcut icon" href="data:;base64,=">
            ${styleTags}
        </head>
       
        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${html}</div>
          ${scriptTags}
        </body>
      </html>`);
  } catch (err) {
    console.error(err);
  }
};

const createApp = (App) => <App />;
