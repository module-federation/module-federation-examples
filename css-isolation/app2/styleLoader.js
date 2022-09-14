const styles = [];
const containers = {};

// Create a shadow container with all styles and a placeholder for the app injection
export const createShadowContainer = id => {
  const shadowContainer = document.createElement('div');
  shadowContainer.attachShadow({ mode: 'open', delegatesFocus: true });
  shadowContainer.shadowRoot.append(...styles);
  const appPlaceholder = document.createElement('div');
  appPlaceholder.id = 'app-placeholder';
  // Block all styles coming from the light DOM
  appPlaceholder.style.all = 'initial';
  shadowContainer.shadowRoot.appendChild(appPlaceholder);
  containers[id] = shadowContainer;
  return shadowContainer;
};

export const deleteShadowContainer = id => {
  delete containers[id];
};

const insertStyle = style => {
  // Update the style list for newly created shadow containers
  styles.push(style);
  // Update the style list for already existing shadow containers.
  // This will update them if any new styles are lazy loaded.
  Object.values(containers).forEach(container => {
    container.shadowRoot.appendChild(style);
  });
};

export default insertStyle;
