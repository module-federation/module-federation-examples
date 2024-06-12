import { h } from "preact";
import Store from "../components/Store";
import c from "./StoresPage.module.css";

const StoresPage = ({ stores = [] }) => {
  return (
    <main class={c.page}>
      <h2>Our Stores</h2>
      <p>
        Want to see our products in person? Visit one of our stores to see our
        products up close and talk to our experts. We have stores in the
        following locations:
      </p>
      <ul class={c.list}>{stores.map(Store)}</ul>
    </main>
  );
};

StoresPage.api = "/stores";

export default StoresPage;
