import data from "../database/index.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Store from "../components/Store.js";
import { html } from "../utils.js";
import Meta from "../components/Meta.js";

/**
 * StoresPage component.
 * @param {object} props - The properties of the StoresPage component.
 * @param {string} props.category - The category key.
 * @param {HonoContext} props.c - The hone context.
 * @returns {string} The StoresPage component markup.
 */
export default ({ c }) => {
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
        <main class="e_StoresPage">
          <h2>Our Stores</h2>
          <p>
            Want to see our products in person? Visit one of our stores to see
            our products up close and talk to our experts. We have stores in the
            following locations:
          </p>
          <ul class="e_StoresPage_list">
            ${data.stores.map(Store).join("")}
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
