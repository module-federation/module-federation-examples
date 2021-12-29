import { ref, onMounted, onBeforeUnmount, onUpdated } from 'vue';
import ReactDOM from 'react-dom';
import React from 'react';

const firstLoad = new Promise(resolve => setTimeout(resolve, 1000));

async function fetchButton() {
  // simulate long network delay
  await firstLoad;

  // uncomment to simulate failed load
  // throw new Error("Failed to load button from remote.");

  return (await import('home/Button')).default;
}

export default {
  name: 'ReactButton',
  props: {
    text: String,
    onClick: Function,
  },
  setup(props) {
    const root = ref(null);
    const error = ref(null);
    const ButtonComponent = ref(null);

    function updateReactComponent() {
      if (!ButtonComponent.value || !!error.value) return;

      ReactDOM.render(React.createElement(ButtonComponent.value, props), root.value);
    }

    function unmountReactComponent() {
      root.value && ReactDOM.unmountComponentAtNode(root.value);
    }

    onMounted(updateReactComponent);
    onUpdated(updateReactComponent);
    onBeforeUnmount(unmountReactComponent);

    fetchButton()
      .then(b => {
        ButtonComponent.value = b;
        updateReactComponent();
      })
      .catch(e => {
        error.value = e;
      });

    return { root, error };
  },
  template: `
    <!-- this element is just served to mount the React element  -->
    <div v-if="error">error loading button</div>
    <div v-else ref="root">loading button...</div>
  `,
};
