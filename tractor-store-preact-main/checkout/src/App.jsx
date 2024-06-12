import { h } from "preact";
import { Router, route } from "preact-router";
import Fragment from "./components/Fragment";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThanksPage from "./pages/ThanksPage";
import fetchData from "./fetchData";
import { useState, useCallback } from "preact/hooks";
import "./styles.css";

const App = ({ path, data }) => {
  const [state, update] = useState(data);
  const [initial, setInitial] = useState(true);

  const updateData = useCallback(
    async (url) => {
      // skip data fetching on initial render
      if (initial) {
        setInitial(false);
        return;
      }
      const api = url.current.type.api;
      if (!api) return;
      const query = url.matches;
      const newData = await fetchData(api, { query });
      update(newData);
    },
    [initial]
  );

  const handleDelete = useCallback(async (sku) => {
    await fetchData("/cart/item", { method: "DELETE", query: { sku } });
    window.dispatchEvent(new CustomEvent("checkout:cart-updated"));
    update(await fetchData(CartPage.api));
  }, []);

  return (
    <div data-boundary="checkout-page">
      <Fragment team="explore" name="header" />
      <Router url={path} onChange={updateData}>
        <CartPage
          path="/checkout/cart"
          {...state}
          handleDelete={handleDelete}
        />
        <CheckoutPage path="/checkout/checkout" />
        <ThanksPage path="/checkout/thanks" />
        <div default>
          <h1>404 Not Found {path}</h1>
        </div>
      </Router>
      <Fragment team="explore" name="footer" />
    </div>
  );
};

export default App;
