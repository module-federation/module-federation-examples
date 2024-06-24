import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App);

export const bootstrap = () => {
  app
    .use(store(app))
    .use(router)
    .mount("#root");
};
