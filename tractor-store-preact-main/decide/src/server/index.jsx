import { h } from "preact";
import { Hono } from "hono";
import dotenv from "dotenv";
import { renderToString } from "preact-render-to-string";
import App from "../App";
import fetchData from "../fetchData";
import { html, IMAGE_SERVER } from "../utils";
import { productPageData } from "./service";
import ProductPage from "../pages/ProductPage";
dotenv.config({ path: "../.env" });

export default function createApp(beforeRoutes = (app) => {}) {
  const app = new Hono();

  // request logging
  app.use((c, next) => {
    if (!c.req.path.includes("/static/")) {
      console.log(c.req.method, c.req.path, c.req.query());
    }
    return next();
  });

  if (beforeRoutes) beforeRoutes(app);

  /**
   * API endpoints
   */
  app.get("/decide/api/product", (c) => c.json(productPageData(c.req.query())));

  /**
   * Pages
   */
  app.get("/product/:id", async (c) => {
    const { id } = c.req.param();
    const { sku } = c.req.query();
    const query = { id };
    if (sku) query.sku = sku;
    return await renderPage(ProductPage.api, { query }, c);
  });

  async function renderPage(api, params = {}, c) {
    const data = await fetchData(api, params);
    const jsx = <App data={data} path={c.req.path} />;
    const rendered = renderToString(jsx);
    const state = JSON.stringify(data || {});
    return c.html(pageHtml(rendered, state));
  }

  function pageHtml(rendered, state) {
    return html`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tractor Store</title>
          <link rel="stylesheet" href="/explore/static/client.css" />
          <link rel="stylesheet" href="/decide/static/client.css" />
          <link rel="stylesheet" href="/checkout/static/client.css" />
        </head>
        <body data-boundary="decide-page">
          <div id="decide-app">${rendered}</div>
          <script type="application/json" data-state>
            ${state}
          </script>
          <script src="/explore/static/client.js" type="module"></script>
          <script src="/checkout/static/client.js" type="module"></script>
          <script src="/decide/static/client.js" type="module"></script>
          <script src="${IMAGE_SERVER}/cdn/js/helper.js" type="module"></script>
        </body>
      </html>
    `;
  }

  return app;
}
