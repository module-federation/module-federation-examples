import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

export const bootstrap = () => {
  return createApp(App)
    .use(store)
    .mount("#root");
};
