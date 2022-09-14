const styles = [];
const containers = [];

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
  // Update the style list for already existing shadow containers
  containers.forEach(container => {
    container.shadowRoot.appendChild(style);
  });
};

export default insertStyle;
