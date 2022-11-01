import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

const app = express();

app.get('/*', async (req, res, next) => {

  // Don't statically import App.js, otherwise the Host app crashes on startup
  // because there's no webpack module entry for "website2/SharedComponent" yet.
  // The MF plugin will populate it during runtime, so dynamically import App.js to give it time

  const App = (await import('./App')).default;
  const html = renderToString(<App />);
  res.send(html);
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});

