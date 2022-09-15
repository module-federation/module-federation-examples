const styles = [];
const containers = {};

// Create a shadow container with all styles and a placeholder for the app injection
export const createShadowContainer = parentElementId => {
  const shadowContainer = document.getElementById(parentElementId);
  // Block all styles coming from the light DOM
  shadowContainer.style.all = 'initial';
  shadowContainer.attachShadow({ mode: 'open', delegatesFocus: true });
  shadowContainer.shadowRoot.prepend(...styles);
  // Create a body element so that reboot CSS rules work in the shadow DOM
  const body = document.createElement('body');
  // Create a placeholder for the React app
  const appPlaceholder = document.createElement('div');
  appPlaceholder.id = 'app-placeholder';
  body.appendChild(appPlaceholder);
  shadowContainer.shadowRoot.appendChild(body);
  containers[parentElementId] = shadowContainer;
  return appPlaceholder;
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
    container.shadowRoot.prepend(style);
  });
};

export default insertStyle;
