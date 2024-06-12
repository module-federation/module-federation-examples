/**
 * @typedef {object} Variant
 * @property {string} name - The name of the variant.
 * @property {string} image - The URL of the variant image.
 * @property {string} sku - The SKU of the variant.
 * @property {string} color - The color of the variant.
 * @property {number} price - The price of the variant.
 */

/**
 * @typedef {object} Product
 * @property {string} name - The name of the product.
 * @property {string} id - The ID of the product.
 * @property {string} category - The category of the product.
 * @property {string[]} highlights - The highlights of the product.
 * @property {Variant[]} variants - The variants of the product.
 */

/**
 * @typedef {object} Database
 * @property {Product[]} products - The products in the database.
 */
