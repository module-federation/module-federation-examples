import data from "../database/index.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Product from "../components/Product.js";
import Filter from "../components/Filter.js";
import { html } from "../utils.js";
import Meta from "../components/Meta.js";

/**
 * CategoryPage component.
 * @param {object} props - The properties of the CategoryPage component.
 * @param {string} props.category - The category key.
 * @param {HonoContext} props.c - The hone context.
 * @returns {string} The CategoryPage component markup.
 */
export default ({ category, c }) => {
  const cat = category && data.categories.find((c) => c.key === category);

  const title = cat ? cat.name : "All Machines";
  const products = cat
    ? cat.products
    : data.categories.flatMap((c) => c.products);
  // sort products by price descending
  products.sort((a, b) => b.startPrice - a.startPrice);
  const filters = [
    { url: "/products", name: "All", active: !cat },
    ...data.categories.map((c) => ({
      url: `/products/${c.key}`,
      name: c.name,
      active: c.key === category,
    })),
  ];

  return html`<!doctype html>
    <html>
      <head>
        <title>Tractor Store</title>
        <link rel="stylesheet" href="/explore/static/styles.css" />
        <link rel="stylesheet" href="/decide/static/styles.css" />
        <link rel="stylesheet" href="/checkout/static/styles.css" />
        ${Meta()}
      </head>
      <body data-boundary="explore-page">
        ${Header({ c })}
        <main class="e_CategoryPage">
          <h2>${title}</h2>
          <div class="e_CategoryPage__subline">
            <p>${products.length} products</p>
            ${Filter({ filters })}
          </div>
          <ul class="e_CategoryPage_list">
            ${products.map(Product).join("")}
          </ul>
        </main>
        ${Footer()}
        <script src="/explore/static/scripts.js" type="module"></script>
        <script src="/decide/static/scripts.js" type="module"></script>
        <script src="/checkout/static/scripts.js" type="module"></script>
        <script src="/cdn/js/helper.js" type="module"></script>
      </body>
    </html>`;
};
