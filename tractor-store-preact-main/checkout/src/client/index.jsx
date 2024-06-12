import { h, hydrate } from "preact";
import register from "preact-custom-element";
import AddToCartCe from "./fragments/AddToCartCe";
import MiniCartCe from "./fragments/MiniCartCe";
import App from "../App";

// client-side hydration on page level
function hydrateApp() {
  const $app = document.getElementById("checkout-app");
  if ($app) {
    const state = JSON.parse($app.nextElementSibling.textContent || "{}");
    hydrate(<App data={state} />, $app);
  }
}

// hook into preact-custom-elements initialization and provide state from DOM to custom elements
window.addEventListener(
  "_preact",
  (event) => {
    console.log("hydrate", event);
    const $el = event.target;
    const tagName = $el.tagName.toLowerCase();
    console.log("hydrate", tagName, $el);
    if (tagName.startsWith("checkout-") && $el.shadowRoot) {
      console.log("hydrate", tagName, $el, $el.shadowRoot.innerHTML);
      const $state = $el.shadowRoot.querySelector("script[data-state]");
      const state = JSON.parse($state?.textContent || "{}");
      event.detail.context = state;
      console.log("hydrate", tagName, state, $state?.textContent);
      $el.setAttribute("hydate", true);
    }
  },
  { capture: true }
);

// client-side hydration on fragment level
register(AddToCartCe, "checkout-addtocart", null, { shadow: true });
register(MiniCartCe, "checkout-minicart", null, { shadow: true });
hydrateApp();

console.log("checkout client ready");
