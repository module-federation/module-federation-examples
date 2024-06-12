import data from "../database/index.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Recommendations from "../components/Recommendations.js";
import { html, src, srcset } from "../utils.js";
import Meta from "../components/Meta.js";

/**
 * HomePage component.
 * @param {object} props - The properties of the HomePage component.
 * @param {HonoContext} props.c - The hone context.
 * @returns {string} The HomePage component markup.
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
        <main class="e_HomePage">
          ${data.teaser
            .map(
              ({ title, image, url }) =>
                html`<a class="e_HomePage__categoryLink" href="${url}">
                  <img
                    src="${src(image, 500)}"
                    srcet="${srcset(image, [500, 1000])}"
                    sizes="100vw, (min-width: 500px) 50vw"
                    alt="${title}"
                  />
                  ${title}
                </a>`,
            )
            .join("")}
          <div class="e_HomePage__recommendations">
            ${Recommendations({
              skus: ["CL-01-GY", "AU-07-MT"],
            })}
          </div>
        </main>
        ${Footer()}
        <script src="/explore/static/scripts.js" type="module"></script>
        <script src="/decide/static/scripts.js" type="module"></script>
        <script src="/checkout/static/scripts.js" type="module"></script>
        <script src="/cdn/js/helper.js" type="module"></script>
      </body>
    </html>`;
};
