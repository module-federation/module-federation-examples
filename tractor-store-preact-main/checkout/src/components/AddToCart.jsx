import { h } from "preact";
import c from "./AddToCart.module.css";
import { fmtprice } from "../utils";
import Button from "./Button";

const AddToCart = ({
  sku,
  outOfStock,
  variant = {},
  confirmed,
  handleSubmit = () => {},
}) => {
  return (
    <form
      action="/checkout/api/cart/item"
      method="POST"
      class={c.root}
      data-boundary="checkout-button"
      onSubmit={handleSubmit}
    >
      <link rel="stylesheet" href="/checkout/static/client.css" />
      <input type="hidden" name="sku" value={sku} />
      <div class={c.information}>
        <p>{fmtprice(variant.price)}</p>
        <p class={[c.stock, outOfStock ? c.stockEmpty : c.stockOk].join(" ")}>
          {outOfStock
            ? "out of stock"
            : `${variant.inventory} in stock, free shipping`}
        </p>
      </div>
      <Button extraClass={c.button} variant="primary" disabled={outOfStock}>
        Add to basket
      </Button>
      <div class={[c.confirmed, confirmed ? "" : c.confirmedHidden].join(" ")}>
        <p>Tractor was added.</p>
        <a href="/checkout/cart" class={c.link}>
          View in basket.
        </a>
      </div>
    </form>
  );
};

AddToCart.api = "/addtocart";

export default AddToCart;
