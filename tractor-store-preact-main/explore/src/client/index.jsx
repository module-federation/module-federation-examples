import { h, hydrate } from "preact";
import register from "preact-custom-element";
import HeaderCe from "./fragments/HeaderCe";
import FooterCe from "./fragments/FooterCe";
import RecommendationsCe from "./fragments/RecommendationsCe";
import App from "../App";

// client-side hydration on page level
function hydrateApp() {
  const $app = document.getElementById("explore-app");
  if ($app) {
    const state = JSON.parse($app.nextElementSibling.textContent || "{}");
    hydrate(<App data={state} />, $app);
  }
}

// hook into preact-custom-elements initialization and provide state from DOM to custom elements
window.addEventListener(
  "_preact",
  (event) => {
    const $el = event.target;
    const tagName = $el.tagName.toLowerCase();
    if (tagName.startsWith("explore-") && $el.shadowRoot) {
      const $state = $el.querySelector("script[data-state]");
      const state = JSON.parse($state?.textContent || "{}");
      event.detail.context = state;
      $el.setAttribute("hydate", true);
    }
  },
  { capture: true }
);

// client-side hydration on fragment level
//register(HeaderCe, "explore-header", null, { shadow: true });
register(FooterCe, "explore-footer", null, { shadow: true });
register(RecommendationsCe, "explore-recommendations", null, { shadow: true });
hydrateApp();

console.log("explore client ready");
