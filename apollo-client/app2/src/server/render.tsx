import React from 'react';
import { Helmet } from 'react-helmet';
import { ApolloProvider } from '@apollo/client';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import serialize from 'serialize-javascript';
import fetch from 'node-fetch';

import App from '../client/components/App';
import { createApolloClient } from '../client/apolloClient';

export default async (req, res, next) => {
  const helmet = Helmet.renderStatic();

  const { apolloClient } = createApolloClient({
    ssrMode: true,
    fetch,
  });

  const markup = await renderToStringWithData(
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>,
  );

  const apolloData = apolloClient.extract();

  const serverRenderedApplicationState = {
    apolloData,
  };

  res.statusCode = 200;
  res.setHeader('Content-type', 'text/html');
  res.write('<!DOCTYPE html>');
  res.write(`<html ${helmet.htmlAttributes.toString()}>`);

  res.write(
    `<head>${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}</head><body>`,
  );

  res.write(`<div id="root">${markup}</div>`);

  res.write(
    `<script>window.__CLIENT_CONFIG__ = ${serialize(serverRenderedApplicationState)}</script>`,
  );
  res.write(`<script async data-chunk="main" src="http://localhost:3001/static/main.js"></script>`);
  res.write('</body></html>');
  res.send();
};
