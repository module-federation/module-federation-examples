import { h } from "preact";
import c from "./CartPage.module.css";
import { fmtprice } from "../utils";
import Fragment from "../components/Fragment";
import Button from "../components/Button";
import LineItem from "../components/LineItem";

const CartPage = ({ lineItems = [], total, skus, handleDelete = () => {} }) => {
  return (
    <main class={c.root}>
      <h2>Shopping Cart</h2>
      <ul class={c.lineItems}>
        {lineItems.map((l) => (
          <LineItem {...l} handleDelete={handleDelete} />
        ))}
      </ul>
      <hr />
      <p class={c.total}>Total: {fmtprice(total)}</p>
      <div class={c.buttons}>
        <Button href="/checkout/checkout" variant="primary">
          Checkout
        </Button>
        <Button href="/" variant="secondary" data-native>
          Continue Shopping
        </Button>
      </div>
      <Fragment team="explore" name="recommendations" skus={skus.join(",")} />
    </main>
  );
};

CartPage.api = "/cart";

export default CartPage;
