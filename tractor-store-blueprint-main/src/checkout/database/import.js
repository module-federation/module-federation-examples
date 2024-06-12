// reads product data from a central source and writes the necessary data for this system.
// here we are reading from a js file and writing to a json file.
// in a real world scenario, you would read from a product service and write to a database.

import fs from "fs";
import path from "path";
import products from "../../../products.js";

/**
 * Generates deterministic inventory (0-10) based on the name.
 * @param {string} name - The name of the variant.
 * @returns {number} - The inventory count of the variant.
 */
function getInventory(name) {
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % 11;
}

/**
 * @type {Database}
 */
const database = {
  variants: products.flatMap((p) => {
    return p.variants.map((v) => {
      const name = `${p.name} ${v.name}`;
      return {
        id: p.id,
        name,
        sku: v.sku,
        price: v.price,
        image: v.image,
        inventory: getInventory(name),
      };
    });
  }),
};

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const databaseFile = path.resolve(__dirname, "./database.json");
console.log("Writing database to", databaseFile);
fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2));
