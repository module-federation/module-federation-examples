import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/App';

const render = App => {
  const root = document.getElementById('root');

  ReactDOMClient.hydrateRoot(root, <App />);
};

render(App);