import { createApp, defineAsyncComponent } from "vue";
import { VuePlugin } from "@cloudbees/vuera"
import Layout from "./Layout.vue";

const app = createApp(Layout);
app.use(VuePlugin)
console.log('xxx-app');
app.mount("#app");
