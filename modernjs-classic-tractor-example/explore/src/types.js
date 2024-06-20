/**
 * @typedef {object} Product
 * @property {string} id - The ID of the product.
 * @property {string} name - The name of the product.
 * @property {string} image - The image URL of the product.
 * @property {string} url - The URL of the product.
 * @property {number} startPrice - The starting price of the product.
 */

/**
 * @typedef {object} Variant
 * @property {string} name - The name of the variant.
 * @property {string} sku - The SKU of the variant.
 * @property {string} image - The image URL of the variant.
 * @property {string} product - The ID of the product the variant belongs to.
 * @property {string} url - The URL of the variant.
 */

/**
 * @typedef {object} RecoItem
 * @property {string} name - The name of the recommendation item.
 * @property {string} sku - The SKU of the recommendation item.
 * @property {string} image - The image URL of the recommendation item.
 * @property {string} url - The URL of the recommendation item.
 * @property {number[]} rgb - The RGB color of the recommendation item.
 */

/**
 * @typedef {object} Category
 * @property {string} key - The key of the category.
 * @property {string} name - The name of the category.
 * @property {Product[]} products - The products in the category.
 */

/**
 * @typedef {object} Database
 * @property {Category[]} categories - The categories in the database.
 * @property {{[key: string]: RecoItem}} recommendations - The recommendations in the database.
 */
