import App from './App.svelte';
import './global.css';

const app = new App({
  target: document.querySelector('#app_04'),
  props: {
    name: 'world',
  },
});

export const loadApp = id => {
  return new App({
    target: document.querySelector('#app_04'),
    props: { name: 'world' },
  });
};

window.app = app;

export default app;
