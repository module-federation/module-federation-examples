import { html } from "../utils.js";

/**
 * VariantOption component.
 * @param {object} props - The properties of the VariantOption component.
 * @param {string} props.sku - The SKU of the product variant.
 * @param {string} props.name - The name of the product variant.
 * @param {boolean} props.selected - Whether the variant is selected.
 * @param {string} props.color - The color of the product variant.
 * @returns {string} The VariantOption component markup.
 */
export default ({ sku, name, selected, color }) => {
  return html`<li class="d_VariantOption" style="--variant-color: ${color}">
    <i class="d_VariantOption__color"></i>
    ${selected
      ? html`<strong>${name}</strong>`
      : html`<a href="?sku=${sku}">${name}</a>`}
  </li>`;
};
