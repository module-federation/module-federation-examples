import Vue from 'vue';
import App from './App.vue';

async function mount({ parentContainer }: { parentContainer: HTMLElement }) {
  const container = document.createElement('div');
  parentContainer.appendChild(container);

  new Vue({
    render: h => h(App),
  }).$mount(container);
}

export { mount };
