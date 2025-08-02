import { createPinia } from "pinia";
import { state } from "shared";
import { createApp } from "vue";
// window.useStore 
import "./stores/counter";
import App from "./App.vue";

state.message = "Hello from host!";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
