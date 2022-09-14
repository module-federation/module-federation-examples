import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { createShadowContainer } from '../styleLoader';

const injector = parentElementId => {
  const shadowContainer = createShadowContainer();
  document.getElementById(parentElementId).appendChild(shadowContainer);
  ReactDOM.render(<App />, shadowContainer.shadowRoot.getElementById('app-placeholder'));
};

export default injector;
