import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Compose from './ComposeProviders';
import providers from './StyleProviders';
const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss());
    return () => removeCss.forEach(dispose => dispose());
};

const render = App => {
  const root = document.getElementById('root');

  ReactDOM.hydrateRoot(
      root,
      <Compose providers={providers.map(p => [p, { value: { insertCss } }])}>
        <App />
      </Compose>,

  )
};

render(App);
