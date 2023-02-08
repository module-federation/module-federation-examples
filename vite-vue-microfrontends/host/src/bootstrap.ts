import { createPinia } from "pinia";
import { state } from "shared";
import { createApp } from "vue";
import App from "./App.vue";
import "./stores/counter";

state.message = "Hello from host!";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
