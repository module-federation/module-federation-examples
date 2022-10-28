import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { createShadowContainer, deleteShadowContainer } from '../styleLoader';

export const inject = parentElementId => {
  const appPlaceholder = createShadowContainer(parentElementId);
  ReactDOM.render(<App />, appPlaceholder);
};

export const cleanup = parentElementId => {
  deleteShadowContainer(parentElementId);
  ReactDOM.unmountComponentAtNode(document.getElementById(parentElementId));
};
