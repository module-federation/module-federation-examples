import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import fetch from 'node-fetch';

import App from './components/App';
import { createApolloClient } from './apolloClient';

const { apolloClient, apolloCache } = createApolloClient({ fetch });

if (typeof window !== 'undefined') {
  const { apolloData } = window['__CLIENT_CONFIG__'];
  apolloCache.restore(apolloData);
}

const render = App => {
  const root = document.getElementById('root');

  ReactDOMClient.hydrateRoot(
    root,
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>,
  );
};

render(App);
