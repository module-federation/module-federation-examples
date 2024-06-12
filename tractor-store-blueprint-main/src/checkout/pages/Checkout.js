import Page from "../components/Page.js";
import CompactHeader from "../components/CompactHeader.js";
import { html } from "../utils.js";
import StorePicker from "../../explore/components/StorePicker.js";

// imports from other teams -> fragments
import Footer from "../../explore/components/Footer.js";
import Button from "../components/Button.js";

export default () => {
  const content = html`
    ${CompactHeader()}
    <main class="c_Checkout">
      <h2>Checkout</h2>
      <form
        action="/checkout/place-order"
        method="post"
        class="c_Checkout__form"
      >
        <h3>Personal Data</h3>
        <fieldset class="c_Checkout__name">
          <div>
            <label class="c_Checkout__label" for="c_firstname">
              First name
            </label>
            <input
              class="c_Checkout__input"
              type="text"
              id="c_firstname"
              name="firstname"
              required
            />
          </div>
          <div>
            <label class="c_Checkout__label" for="c_lastname">Last name</label>
            <input
              class="c_Checkout__input"
              type="text"
              id="c_lastname"
              name="lastname"
              required
            />
          </div>
        </fieldset>

        <h3>Store Pickup</h3>
        <fieldset>
          <div class="c_Checkout__store">${StorePicker()}</div>
          <label class="c_Checkout__label" for="c_storeId">Store ID</label>
          <input
            class="c_Checkout__input"
            type="text"
            id="c_storeId"
            name="storeId"
            readonly
            required
          />
        </fieldset>

        <div class="c_Checkout__buttons">
          ${Button({
            children: "place order",
            type: "submit",
            variant: "primary",
            disabled: true,
          })}
          ${Button({
            href: "/checkout/cart",
            children: "back to cart",
            variant: "secondary",
          })}
        </div>
      </form>
    </main>
    ${Footer()}
  `;
  return Page({ content });
};
