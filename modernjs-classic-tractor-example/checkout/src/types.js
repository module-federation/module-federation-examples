/**
 * @typedef {object} Variant
 * @property {string} id - The ID of the product the variant belongs to.
 * @property {string} name - The name of the variant.
 * @property {string} sku - The SKU of the variant.
 * @property {number} price - The price of the variant.
 * @property {string} image - The image URL of the variant.
 * @property {number} inventory - The inventory count of the variant.
 */

/**
 * @typedef {object} Database
 * @property {Variant[]} variants - The variants in the database.
 */

/**
 * @typedef {object} CookieLineItem
 * @property {string} sku - The SKU of the line item.
 * @property {number} quantity - The quantity of the line item in the cart.
 */

/**
 * LineItem component.
 * @typedef {object} LineItem
 * @property {string} id - The ID of the product.
 * @property {string} name - The name of the variant.
 * @property {string} sku - The SKU of the variant.
 * @property {number} quantity - The quantity of the variant in the cart.
 * @property {number} total - The total price of the variant in the cart.
 * @property {string} image - The URL of the variant image.
 */
