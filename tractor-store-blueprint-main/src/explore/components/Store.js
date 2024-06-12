import { html, src, srcset } from "../utils.js";

/**
 * Store component.
 * @param {Store} props - The properties of the Store component.
 * @returns {string} The Product component markup.
 */
export default ({ name, image, street, city }) => {
  return html`<li class="e_Store">
    <div class="e_Store_content">
      <img
        class="e_Store_image"
        src="${src(image, 200)}"
        srcset="${srcset(image, [200, 400])}"
        width="200"
        height="200"
      />
      <p class="e_Store_address">
        ${name}<br />
        ${street}<br />
        ${city}
      </p>
    </div>
  </li>`;
};
