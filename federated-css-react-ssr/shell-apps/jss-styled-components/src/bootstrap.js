import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Compose from './ComposeProviders';

const render = App => {
  const root = document.getElementById('root');

  ReactDOM.hydrate(
      <Compose providers={[]}>
        <App />
      </Compose>,
      root
  )
};

render(App);
