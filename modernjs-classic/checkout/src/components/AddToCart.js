import data from '../database/index';
import Button from './Button';
import './AddToCart.css';
/**
 * AddToCart component.
 * @param {object} props - The properties of the AddToCart component.
 * @param {string} props.sku - The SKU of the variant to add to the cart.
 * @returns {JSX.Element} The AddToCart component markup.
 */
const AddToCart = ({ sku }) => {
  const variant = data.variants.find(p => p.sku === sku);
  const outOfStock = variant.inventory === 0;

  return (
    <form
      action="/checkout/cart/add"
      method="POST"
      className="c_AddToCart"
      data-boundary="checkout-button"
    >
      <input type="hidden" name="sku" value={sku} />
      <div className="c_AddToCart__information">
        <p>{variant.price} Ø</p>
        {variant.inventory > 0 ? (
          <p className="c_AddToCart__stock c_AddToCart__stock--ok">
            {variant.inventory} in stock, free shipping
          </p>
        ) : (
          <p className="c_AddToCart__stock c_AddToCart__stock--empty">
            out of stock
          </p>
        )}
      </div>
      <Button
        disabled={outOfStock}
        className="c_AddToCart__button"
        variant="primary"
      >
        add to basket
      </Button>
      <div className="c_AddToCart__confirmed c_AddToCart__confirmed--hidden">
        <p>Tractor was added.</p>
        <a href="/checkout/cart" className="c_AddToCart__link">
          View in basket.
        </a>
      </div>
    </form>
  );
};

export default AddToCart;
