import { route } from "preact-router";

// for prettier formatting
// see https://prettier.io/docs/en/options.html#embedded-language-formatting
export const html = String.raw;

// use the image server if not using local images
export const IMAGE_SERVER =
  typeof process === "undefined" || process.env.USE_LOCAL_IMAGES !== "true"
    ? "https://cdn.the-tractor.store"
    : "";

/**
 * Replaces the placeholder "[size]" in the image URL with the specified size.
 * @param {string} image - The original image URL.
 * @param {number} size - The desired size for the image.
 * @returns {string} - The modified image URL with the size placeholder replaced.
 */
export function src(image, size) {
  return IMAGE_SERVER + image.replace("[size]", `${size}`);
}

/**
 * Generates the srcset attribute value for an image with different sizes.
 * @param {string} image - The original image URL.
 * @param {number[]} sizes - The array of sizes for the image.
 * @returns {string} - The srcset attribute value.
 */
export function srcset(image, sizes = []) {
  return sizes.map((size) => `${src(image, size)} ${size}w`).join(", ");
}

/**
 * Formats a price value.
 * @param {number} price - The price value to format.
 * @returns {string} - The formatted price.
 */
export function fmtprice(price) {
  return `${price},00 Ø`;
}

/**
 * Handles click event from inside a custom element. use preact-router and prevent if a matching route is found.
 * @param {MouseEvent} e - The click event.
 */
function navigateClient(e) {
  const path = e.composedPath();
  const link = path.find((el) => el.tagName === "A");
  if (link) {
    // get href without domain
    const url = new URL(link.href);
    const path = url.pathname + url.search;
    if (route(path)) e.preventDefault();
  }
}

export const navigate =
  typeof window !== "undefined" ? navigateClient : undefined;
