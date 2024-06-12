import { h } from "preact";
import { Hono } from "hono";
import dotenv from "dotenv";
import { renderToString } from "preact-render-to-string";
import App from "../App";
import fetchData from "../fetchData";
import { html, IMAGE_SERVER } from "../utils";
import {
  handleAddToCart,
  handleRemoveFromCart,
  handlePlaceOrder,
  cartPageData,
  addToCartData,
  miniCartData,
} from "./service";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ThanksPage from "../pages/ThanksPage";
import MiniCart from "../components/MiniCart";
import AddToCart from "../components/AddToCart";
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
  app.get("/checkout/api/cart", (c) => c.json(cartPageData(c)));
  app.get("/checkout/api/addtocart", (c) =>
    c.json(addToCartData(c.req.query("sku")))
  );
  app.get("/checkout/api/minicart", (c) => c.json(miniCartData(c)));
  app.post("/checkout/api/cart/item", async (c) => {
    await handleAddToCart(c);
    return c.json({ success: true });
  });
  app.delete("/checkout/api/cart/item", async (c) => {
    await handleRemoveFromCart(c);
    return c.json({ success: true });
  });
  app.post("/checkout/api/placeorder", async (c) => {
    await handlePlaceOrder(c);
    return c.json({ success: true });
  });

  /**
   * ESI fragments
   */
  app.get(
    "/checkout/esi/minicart",
    async (c) => await renderFragment(MiniCart, c)
  );
  app.get(
    "/checkout/esi/addtocart",
    async (c) => await renderFragment(AddToCart, c)
  );

  async function renderFragment(Component, c) {
    let data = {};
    if (Component.api) {
      data = await fetchData(Component.api, {
        query: c.req.query(),
        headers: { cookie: c.req.header("cookie") },
      });
    }
    const rendered = renderToString(<Component {...data} />);
    return c.html(fragmentHtml(rendered, data));
  }

  function fragmentHtml(rendered, state = {}) {
    const json = JSON.stringify(state);
    return `
      <template shadowrootmode="open">
        ${rendered}
      </template>
      <script type="application/json" data-state>${json}</script>
    `;
  }

  /**
   * Pages
   */
  app.get("/checkout/cart", async (c) => await renderPage(CartPage, c));
  app.get("/checkout/checkout", async (c) => await renderPage(CheckoutPage, c));
  app.get("/checkout/thanks", async (c) => await renderPage(ThanksPage, c));

  async function renderPage(Component, c) {
    const data = Component.api
      ? await fetchData(Component.api, {
          // pass browser cookies to API
          headers: { cookie: c.req.header("cookie") },
        })
      : {};
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
          <link rel="stylesheet" href="/checkout/static/client.css" />
          <link rel="stylesheet" href="/decide/static/client.css" />
          <link rel="stylesheet" href="/checkout/static/client.css" />
        </head>
        <body data-boundary="checkout-page">
          <div id="checkout-app">${rendered}</div>
          <script type="application/json" data-state>
            ${state}
          </script>
          <script src="/checkout/static/client.js" type="module"></script>
          <script src="/decide/static/client.js" type="module"></script>
          <script src="/checkout/static/client.js" type="module"></script>
          <script src="${IMAGE_SERVER}/cdn/js/helper.js" type="module"></script>
        </body>
      </html>
    `;
  }

  return app;
}
