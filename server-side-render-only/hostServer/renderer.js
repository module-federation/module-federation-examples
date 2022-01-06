import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';

export default async (req, res, next) => {
  const html = renderToString(<App />);

  res.send(html);
};
