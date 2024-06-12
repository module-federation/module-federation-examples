import { Hono } from "hono";
import { logger } from "hono/logger";
import { HomePage, StoresPage, CategoryPage } from "./explore/index.js";
import { ProductPage } from "./decide/index.js";
import {
  MiniCart,
  CartPage,
  Checkout,
  Thanks,
  handleAddToCart,
  handleRemoveFromCart,
  handlePlaceOrder,
} from "./checkout/index.js";

/**
 * Creates a server instance.
 * @returns {Hono} The server instance.
 */
export default function createServer() {
  const app = new Hono();
  app.use(logger());

  /**
   * Team Explore
   */
  app.get("/", async (c) => {
    return c.html(HomePage({ c }));
  });
  app.get("/stores", async (c) => {
    return c.html(StoresPage({ c }));
  });
  app.get("/products/:category?", async (c) => {
    console.log("category", c.req.param("category"));
    const category = c.req.param("category");
    return c.html(CategoryPage({ category, c }));
  });

  /**
   * Team Decide
   */
  app.get("/product/:id", async (c) => {
    const { id } = c.req.param();
    const sku = c.req.query("sku");
    return c.html(ProductPage({ id, sku, c }));
  });

  /**
   * Team Buy
   */
  app.get("/checkout/cart", (c) => c.html(CartPage({ c })));
  app.get("/checkout/checkout", (c) => c.html(Checkout()));
  app.get("/checkout/mini-cart", (c) => c.html(MiniCart({ c })));
  app.post("/checkout/cart/add", async (c) => {
    await handleAddToCart(c);
    return c.redirect("/checkout/cart");
  });
  app.post("/checkout/cart/remove", async (c) => {
    await handleRemoveFromCart(c);
    return c.redirect("/checkout/cart");
  });
  app.post("/checkout/place-order", async (c) => {
    await handlePlaceOrder(c);
    return c.redirect("/checkout/thanks");
  });
  app.get("/checkout/thanks", (c) => c.html(Thanks({ c })));

  return app;
}
