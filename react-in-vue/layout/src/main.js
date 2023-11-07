import { createApp, ref } from 'vue';
import Layout from './Layout';

const App = {
  components: {
    layout: Layout,
  },
  template: `
    <h1>React in Vue</h1>
    <div class="app">
      <layout />
    </div>
  `,
};

createApp(App).mount('#app');
