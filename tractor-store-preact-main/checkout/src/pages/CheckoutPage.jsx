import { h } from "preact";
import Button from "../components/Button.jsx";
import Fragment from "../components/Fragment.jsx";
import c from "./CheckoutPage.module.css";

const Checkout = () => {
  return (
    <main class={c.root}>
      <h2>Checkout</h2>
      <form action="/checkout/place-order" method="post" class={c.form}>
        <h3>Personal Data</h3>
        <fieldset class={c.name}>
          <div>
            <label class={c.label} for="c_firstname">
              First name
            </label>
            <input
              class={c.input}
              type="text"
              id="c_firstname"
              name="firstname"
              required
            />
          </div>
          <div>
            <label class={c.label} for="c_lastname">
              Last name
            </label>
            <input
              class={c.input}
              type="text"
              id="c_lastname"
              name="lastname"
              required
            />
          </div>
        </fieldset>

        <h3>Store Pickup</h3>
        <fieldset>
          <div class={c.store}>
            <Fragment team="explore" name="store-picker" />
          </div>
          <label class={c.label} for="c_storeId">
            Store ID
          </label>
          <input
            class={c.input}
            type="text"
            id="c_storeId"
            name="storeId"
            readonly
            required
          />
        </fieldset>

        <div class={c.buttons}>
          <Button type="submit" variant="primary" disabled>
            Place Order
          </Button>
          <Button href="/checkout/cart" variant="secondary">
            Back to Cart
          </Button>
        </div>
      </form>
    </main>
  );
};

Checkout.api = null;

export default Checkout;
