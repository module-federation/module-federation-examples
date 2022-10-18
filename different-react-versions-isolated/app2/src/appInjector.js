import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

export const inject = parentElementId =>
  ReactDOM.render(<App />, document.getElementById(parentElementId));

export const unmount = parentElementId =>
  ReactDOM.unmountComponentAtNode(document.getElementById(parentElementId));
