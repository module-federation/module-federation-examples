const styles = [];
const containers = [];

// Create a shadow container with all styles and a placeholder for the app injection
export const createShadowContainer = () => {
  const shadowContainer = document.createElement('div');
  shadowContainer.attachShadow({ mode: 'open', delegatesFocus: true });
  shadowContainer.shadowRoot.append(...styles);
  const appPlaceholder = document.createElement('div');
  appPlaceholder.id = 'app-placeholder';
  shadowContainer.shadowRoot.appendChild(appPlaceholder);
  containers.push(shadowContainer);
  return shadowContainer;
};

const insertStyle = style => {
  // Update the style list for newly created shadow containers
  styles.push(style);
  // Update the style list for already existing shadow containers.
  // This will update them if any new styles are lazy loaded.
  containers.forEach(container => {
    container.shadowRoot.appendChild(style);
  });
};

export default insertStyle;
