import { createApp } from 'vue';
import VueCounter from './VueCounter.vue';

const mount = el => {
  const app = createApp(VueCounter);
  app.mount(el);
  return app;
};

export { mount };
