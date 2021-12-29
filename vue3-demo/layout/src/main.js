import { createApp, defineAsyncComponent } from 'vue';
import Layout from './Layout.vue';

const Content = defineAsyncComponent(() => import('home/Content'));
const Button = defineAsyncComponent(() => import('home/Button'));

const app = createApp(Layout);

app.component('content-element', Content);
app.component('button-element', Button);

app.mount('#app');
