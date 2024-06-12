import { html, src, srcset } from "../utils.js";

/**
 * Recommendation component.
 * @param {RecoItem} props - The properties of the Recommendation component.
 * @returns {string} The Recommendation component markup.
 */
export default ({ image, url, name }) => {
  return html`<li class="e_Recommendation">
    <a class="e_Recommendation_link" href="${url}">
      <img
        class="e_Recommendation_image"
        src="${src(image, 200)}"
        srcet="${srcset(image, [200, 400])}"
        sizes="200px"
        width="200"
        height="200"
      />
      <span class="e_Recommendation_name">${name}</span>
    </a>
  </li>`;
};
