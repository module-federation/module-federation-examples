import StorePicker from 'explore/StorePicker';
import Footer from 'explore/Footer';
import Page from '../../components/Page';
import CompactHeader from '../../components/CompactHeader';
import './Checkout.css';
import Button from '../../components/Button';

const Checkout = () => {
  return (
    <Page>
      <CompactHeader />
      <main className="c_Checkout">
        <h2>Checkout</h2>
        <form
          action="/checkout/place-order"
          method="post"
          className="c_Checkout__form"
        >
          <h3>Personal Data</h3>
          <fieldset className="c_Checkout__name">
            <div>
              <label className="c_Checkout__label" htmlFor="c_firstname">
                First name
              </label>
              <input
                className="c_Checkout__input"
                type="text"
                id="c_firstname"
                name="firstname"
                required
              />
            </div>
            <div>
              <label className="c_Checkout__label" htmlFor="c_lastname">
                Last name
              </label>
              <input
                className="c_Checkout__input"
                type="text"
                id="c_lastname"
                name="lastname"
                required
              />
            </div>
          </fieldset>

          <h3>Store Pickup</h3>
          <fieldset>
            <div className="c_Checkout__store">
              <StorePicker />
            </div>
            <label className="c_Checkout__label" htmlFor="c_storeId">
              Store ID
            </label>
            <input
              className="c_Checkout__input"
              type="text"
              id="c_storeId"
              name="storeId"
              readOnly
              required
            />
          </fieldset>

          <div className="c_Checkout__buttons">
            <Button type="submit" variant="primary" disabled={true}>
              place order
            </Button>
            <Button href="/checkout/cart" variant="secondary">
              back to cart
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </Page>
  );
};

export default Checkout;
