import data from "../database/index.js";
import { html } from "../utils.js";
import Button from "./Button.js";

/**
 * AddToCart component.
 * @param {object} props - The properties of the AddToCart component.
 * @param {string} props.sku - The SKU of the variant to add to the cart.
 * @returns {string} The AddToCart component markup.
 */
export default ({ sku }) => {
  const variant = data.variants.find((p) => p.sku === sku);
  const outOfStock = variant.inventory === 0;
  return html`<form
    action="/checkout/cart/add"
    method="POST"
    class="c_AddToCart"
    data-boundary="checkout-button"
  >
    <input type="hidden" name="sku" value="${sku}" />
    <div class="c_AddToCart__information">
      <p>${variant.price} Ø</p>
      ${variant.inventory > 0
        ? html`<p class="c_AddToCart__stock c_AddToCart__stock--ok">
            ${variant.inventory} in stock, free shipping
          </p>`
        : html`<p class="c_AddToCart__stock c_AddToCart__stock--empty">
            out of stock
          </p>`}
    </div>
    ${Button({
      disabled: outOfStock,
      className: "c_AddToCart__button",
      children: html`add to basket`,
      variant: "primary",
    })}
    <div class="c_AddToCart__confirmed c_AddToCart__confirmed--hidden">
      <p>Tractor was added.</p>
      <a href="/checkout/cart" class="c_AddToCart__link">View in basket.</a>
    </div>
  </form>`;
};
