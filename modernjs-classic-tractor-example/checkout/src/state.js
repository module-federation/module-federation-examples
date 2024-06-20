const ITEM_SEP = '|';
const QTY_SEP = '_';
const COOKIE = 'c_cart';

/**
 * Reads the line items from the cookie.
 * @param {Request} c - The request object.
 * @returns {CookieLineItem[]} An array of items read from the cookie.
 */
export function readFromCookie(c) {
  let cookieStr;

  if (typeof document !== 'undefined') {
    // Client-side
    cookieStr = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${COOKIE}=`))
      ?.split('=')[1];
  } else if (c && c.headers) {
    // Server-side
    const cookieHeader = c.headers.get('cookie');
    cookieStr = cookieHeader
      ?.split('; ')
      .find(row => row.startsWith(`${COOKIE}=`))
      ?.split('=')[1];
  }

  if (!cookieStr) {
    return [];
  }

  return cookieStr.split(ITEM_SEP).map(item => {
    const [sku, quantity] = item.split(QTY_SEP);
    return { sku, quantity: parseInt(quantity, 10) };
  });
}

/**
 * Writes the line items to the cookie.
 * @param {CookieLineItem[]} items - An array of items to write to the cookie.
 * @param {Request} c - The request object.
 */
export function writeToCookie(items, c) {
  const cookieStr = items
    .map(item => `${item.sku}${QTY_SEP}${item.quantity}`)
    .join(ITEM_SEP);

  if (typeof document !== 'undefined') {
    // Client-side
    document.cookie = `${COOKIE}=${cookieStr}; path=/; SameSite=Lax; Secure`;
  } else if (c && c.headers) {
    // Server-side
    c.headers.set(
      'Set-Cookie',
      `${COOKIE}=${cookieStr}; path=/; SameSite=Lax; Secure`,
    );
  }
}
