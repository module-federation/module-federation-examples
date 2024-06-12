import { readFromCookie, writeToCookie } from "./state.js";

/**
 * Handles adding an item to the cart.
 * @param {HonoContext} c - The hono context.
 */
export async function handleAddToCart(c) {
  const body = await c.req.parseBody();
  const sku = body.sku;

  const items = readFromCookie(c);

  const lineItem = items.find((i) => i.sku === sku);
  if (lineItem) {
    lineItem.quantity++;
  } else {
    items.push({ sku, quantity: 1 });
  }
  writeToCookie(items, c);
}

/**
 * Handles removing an item from the cart.
 * @param {HonoContext} c - The hono context.
 */
export async function handleRemoveFromCart(c) {
  const body = await c.req.parseBody();
  const sku = body.sku;

  const items = readFromCookie(c);

  const lineItem = items.find((i) => i.sku === sku);
  if (lineItem) {
    const index = items.indexOf(lineItem);
    items.splice(index, 1);
  }

  writeToCookie(items, c);
}

/**
 * Handles placing an order.
 * @param {HonoContext} c - The hono context.
 */
export async function handlePlaceOrder(c) {
  writeToCookie([], c);
}
