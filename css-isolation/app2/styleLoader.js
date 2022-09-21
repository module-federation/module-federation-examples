const styles = [];
const containers = {};
let isStandalone = false;

// Create a shadow container with all styles and a placeholder for the app injection
export const createShadowContainer = parentElementId => {
  const shadowContainer = document.getElementById(parentElementId);
  // Block all styles coming from the light DOM
  shadowContainer.style.all = 'initial';
  shadowContainer.attachShadow({ mode: 'open', delegatesFocus: true });
  shadowContainer.shadowRoot.append(...styles.map(style => style.cloneNode(true)));
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

  if (isStandalone) {
    document.head.appendChild(style);
  } else {
    // Update the style list for already existing shadow containers.
    // This will provide them with any lazy loaded styles.
    Promise.resolve().then(() => {
      Object.values(containers).forEach(container => {
        container.shadowRoot.appendChild(style.cloneNode(true));
      });
    });
  }
};

// If this function is called it will make the style loader behave as it normally does
// and insert the styles into the head of the document instead of the shadow DOM
export const runStandalone = () => {
  isStandalone = true;
  styles.forEach(style => document.head.appendChild(style));
};

export default insertStyle;
