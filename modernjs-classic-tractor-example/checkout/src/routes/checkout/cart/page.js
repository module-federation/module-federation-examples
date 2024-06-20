import Header from 'explore/Header';
import Footer from 'explore/Footer';
import Recommendations from 'explore/Recommendations';
import LineItem from '../../../components/LineItem';
import data from '../../../database/index';
import { readFromCookie } from '../../../state';
import Button from '../../../components/Button';
import './CartPage.css';

/**
 * Converts cookie line items to cart line items.
 * @param {CookieLineItem[]} items - List of cookie line items.
 * @returns {LineItem[]} - Cart line items.
 */
function convertToLineItems(items) {
  return items.reduce((res, { sku, quantity }) => {
    const variant = data.variants.find(p => p.sku === sku);
    if (variant) {
      res.push({ ...variant, quantity, total: variant.price * quantity });
    }
    return res;
  }, []);
}

const CartPage = ({ c }) => {
  const cookieLineItems = readFromCookie(c);
  const lineItems = convertToLineItems(cookieLineItems);
  const total = lineItems.reduce((res, { total }) => res + total, 0);
  const skus = lineItems.map(({ sku }) => sku);

  return (
    <>
      <Header c={c} />
      <main className="c_CartPage">
        <h2>Warenkorb</h2>
        <ul className="c_CartPage__lineItems">
          {lineItems.map((item, index) => (
            <LineItem key={index} {...item} />
          ))}
        </ul>
        <hr />
        <p className="c_CartPage__total">Total: {total} Ø</p>
        <div className="c_CartPage__buttons">
          <Button href="/checkout/checkout" variant="primary">
            Checkout
          </Button>
          <Button href="/" variant="secondary">
            Continue Shopping
          </Button>
        </div>
        <Recommendations skus={skus} />
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
