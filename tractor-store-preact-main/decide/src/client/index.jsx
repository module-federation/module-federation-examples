import { h, hydrate } from "preact";
import App from "../App";

// client-side hydration on page level
function hydrateApp() {
  const $app = document.getElementById("decide-app");
  if ($app) {
    const state = JSON.parse($app.nextElementSibling.textContent || "{}");
    hydrate(<App data={state} />, $app);
    console.log("decide app hydrated");
  }
}

hydrateApp();

console.log("decide client ready");
