import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { createShadowContainer, deleteShadowContainer } from '../styleLoader';

export const inject = parentElementId => {
  const shadowContainer = createShadowContainer(parentElementId);
  document.getElementById(parentElementId).appendChild(shadowContainer);
  ReactDOM.render(<App />, shadowContainer.shadowRoot.getElementById('app-placeholder'));
};

export const cleanup = parentElementId => {
  deleteShadowContainer(parentElementId);
};
