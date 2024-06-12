// reads product data from a central source and writes the necessary data for this system.
// here we are reading from a js file and writing to a json file.
// in a real world scenario, you would read from a product service and write to a database.

import fs from "fs";
import path from "path";
import products from "../../../products.js";

/**
 * Generates the URL for a product.
 * @param {string} id - The ID of the product.
 * @param {string} sku - The SKU of the product variant.
 * @returns {string} The URL of the product.
 */
export function productUrl(id, sku) {
  const query = sku ? `?sku=${sku}` : "";
  return `/product/${id}${query}`;
}

/**
 * Calculates the starting price of a product's variants.
 * @param {Variant[]} variants - The variants of the product.
 * @returns {number} The starting price.
 */
function startPrice(variants) {
  return variants.reduce((min, variant) => {
    return Math.min(min, variant.price);
  }, Infinity);
}

/**
 * Converts a product object to a formatted product.
 * @param {Product} product - The product object.
 * @returns {Product} The formatted product.
 */
function toProduct(product) {
  return {
    name: product.name,
    id: product.id,
    image: product.variants[0].image,
    startPrice: startPrice(product.variants),
    url: productUrl(product.id),
  };
}

/**
 * Converts a hex color string to an RGB array.
 * @param {string} hex - The hex color string.
 * @returns {number[]} The RGB array.
 **/
function hexToRgb(hex) {
  var bigint = parseInt(hex.replace("#", ""), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return [r, g, b];
}

/**
 * Converts a product object and a variant object to a formatted recommendation item.
 * @param {Product} product - The product object.
 * @param {Variant} variant - The variant object.
 * @returns {RecoItem} The formatted recommendation item.
 */
function toRecoItem(product, variant) {
  return {
    name: `${product.name} ${variant.name}`,
    sku: variant.sku,
    image: variant.image,
    url: productUrl(product.id, variant.sku),
    rgb: hexToRgb(variant.color),
  };
}

/**
 * @type {Database}
 */
const database = {
  teaser: [
    {
      title: "Classic Tractors",
      image: "/cdn/img/scene/[size]/classics.webp",
      url: "/products/classic",
    },
    {
      title: "Autonomous Tractors",
      image: "/cdn/img/scene/[size]/autonomous.webp",
      url: "/products/autonomous",
    },
  ],
  categories: [
    {
      key: "classic",
      name: "Classics",
      products: products.filter((p) => p.category === "classic").map(toProduct),
    },
    {
      key: "autonomous",
      name: "Autonomous",
      products: products
        .filter((p) => p.category === "autonomous")
        .map(toProduct),
    },
  ],
  recommendations: products
    .flatMap((product) =>
      product.variants.map((variant) => toRecoItem(product, variant)),
    )
    .reduce((res, variant) => {
      res[variant.sku] = variant;
      return res;
    }, {}),
  stores: [
    {
      id: "store-a",
      name: "Aurora Flagship Store",
      street: "Astronaut Way 1",
      city: "Arlington",
      image: "/cdn/img/store/[size]/store-1.webp",
    },
    {
      id: "store-b",
      name: "Big Micro Machines",
      street: "Broadway 2",
      city: "Burlington",
      image: "/cdn/img/store/[size]/store-2.webp",
    },
    {
      id: "store-c",
      name: "Central Mall",
      street: "Clown Street 3",
      city: "Cryo",
      image: "/cdn/img/store/[size]/store-3.webp",
    },
    {
      id: "store-d",
      name: "Downtown Model Store",
      street: "Duck Street 4",
      city: "Davenport",
      image: "/cdn/img/store/[size]/store-4.webp",
    },
  ],
};

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const databaseFile = path.resolve(__dirname, "./database.json");
console.log("Writing database to", databaseFile);
fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2));
