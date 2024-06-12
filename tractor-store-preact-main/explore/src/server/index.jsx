import { h } from "preact";
import { Hono } from "hono";
import dotenv from "dotenv";
import { renderToString } from "preact-render-to-string";
import App from "../App";
import fetchData from "../fetchData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Recommendations from "../components/Recommendations";
import { html, IMAGE_SERVER } from "../utils";
import {
  homePageData,
  storesPageData,
  categoryPageData,
  recommendationsFragmentData,
} from "./service";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import StoresPage from "../pages/StoresPage";
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
  app.get("/explore/api/home", (c) => c.json(homePageData()));
  app.get("/explore/api/category", (c) =>
    c.json(categoryPageData(c.req.query("filter")))
  );
  app.get("/explore/api/stores", (c) => c.json(storesPageData()));
  app.get("/explore/api/recommendations", (c) =>
    c.json(recommendationsFragmentData(c.req.query("skus")))
  );

  /**
   * ESI fragments
   */
  app.get("/explore/esi/header", async (c) => await renderFragment(Header, c));
  app.get("/explore/esi/footer", async (c) => await renderFragment(Footer, c));
  app.get(
    "/explore/esi/recommendations",
    async (c) => await renderFragment(Recommendations, c)
  );

  async function renderFragment(Component, c) {
    let data = {};
    if (Component.api) {
      const query = c.req.query();
      data = await fetchData(Component.api, { query });
    }
    const rendered = renderToString(<Component {...data} />);
    return c.html(fragmentHtml(rendered, data));
  }

  function fragmentHtml(rendered, state = {}) {
    const json = JSON.stringify(state);
    return `
      <template shadowrootmode="open">${rendered}</template>
      <script type="application/json" data-state>${json}</script>
    `;
  }

  /**
   * Pages
   */
  app.get("/", async (c) => {
    return await renderPage(HomePage.api, {}, c);
  });

  app.get("/products/:filter?", async (c) => {
    return await renderPage(CategoryPage.api, { query: c.req.param() }, c);
  });

  app.get("/stores", async (c) => {
    return await renderPage(StoresPage.api, {}, c);
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
        <body data-boundary="explore-page">
          <div id="explore-app">${rendered}</div>
          <script type="application/json" data-state>
            ${state}
          </script>
          <script src="/explore/static/client.js" type="module"></script>
          <script src="/decide/static/client.js" type="module"></script>
          <script src="/checkout/static/client.js" type="module"></script>
          <script src="${IMAGE_SERVER}/cdn/js/helper.js" type="module"></script>
        </body>
      </html>
    `;
  }

  return app;
}
