import { getCookie, setCookie } from "hono/cookie";
import data from "../database";

/**
 * Cookie handling
 */
const ITEM_SEP = "|";
const QTY_SEP = "_";
const COOKIE = "c_cart";

export function readFromCookie(c) {
  const cookieStr = getCookie(c, COOKIE);
  if (!cookieStr) return [];
  return cookieStr.split(ITEM_SEP).map((item) => {
    const [sku, quantity] = item.split(QTY_SEP);
    return { sku, quantity: parseInt(quantity, 10) };
  });
}

export function writeToCookie(items, c) {
  const cookieStr = items
    .map((item) => `${item.sku}${QTY_SEP}${item.quantity}`)
    .join(ITEM_SEP);
  console.log("writeToCookie", cookieStr);
  setCookie(c, COOKIE, cookieStr, { httpOnly: true });
}

function convertToLineItems(items) {
  return items.reduce((res, { sku, quantity }) => {
    const variant = data.variants.find((p) => p.sku === sku);
    if (variant) {
      res.push({ ...variant, quantity, total: variant.price * quantity });
    }
    return res;
  }, []);
}

/**
 * Cart Page
 */
export function cartPageData(c) {
  const cookieLineItems = readFromCookie(c);
  const lineItems = convertToLineItems(cookieLineItems);
  const total = lineItems.reduce((res, { total }) => res + total, 0);
  const skus = lineItems.map(({ sku }) => sku);
  return { lineItems, total, skus };
}

/**
 * Add to Cart
 */
export function addToCartData(sku) {
  const variant = data.variants.find((p) => p.sku === sku);
  const outOfStock = variant.inventory === 0;
  return { variant, outOfStock };
}

/**
 * Mini Cart
 */
export function miniCartData(c) {
  const lineItems = readFromCookie(c);
  const quantity = lineItems.reduce((t, { quantity }) => t + quantity, 0);
  return { quantity };
}

/**
 * Cart Actions
 */

export async function handleAddToCart(c) {
  const sku = await c.req.query("sku");
  const items = readFromCookie(c);
  const lineItem = items.find((i) => i.sku === sku);
  if (lineItem) {
    lineItem.quantity++;
  } else {
    items.push({ sku, quantity: 1 });
  }
  writeToCookie(items, c);
}

export async function handleRemoveFromCart(c) {
  const sku = await c.req.query("sku");
  const items = readFromCookie(c);
  const lineItem = items.find((i) => i.sku === sku);
  if (lineItem) {
    const index = items.indexOf(lineItem);
    items.splice(index, 1);
  }
  writeToCookie(items, c);
}

export async function handlePlaceOrder(c) {
  writeToCookie([], c);
}
