import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

const injector = parentElementId =>
  ReactDOM.render(<App />, document.getElementById(parentElementId));

export default injector;
