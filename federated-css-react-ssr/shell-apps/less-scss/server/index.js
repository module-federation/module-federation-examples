const express = require('express');
const initMiddleware = require('./middleware');
const fetch = require('node-fetch');

const app = express();
const PORT = 4004;

async function waitUrl(url, timeout = 120000) {
  const start = Date.now();
  while (true) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch (_) {}
    if (Date.now() - start > timeout) throw new Error(`prewarm timeout for ${url}`);
    await new Promise(r => setTimeout(r, 1000));
  }
}

const done = async () => {
  await Promise.all([
    waitUrl('http://localhost:3007/server/remoteEntry.js'),
    waitUrl('http://localhost:3004/server/remoteEntry.js'),
  ]);
  app.listen(PORT, () => {
    console.info(
      `[${new Date().toISOString()}]`,
      `Shell App is running: 🌎 http://localhost:${PORT}`,
    );
  });
};

if (module.hot) {
  // module.hot.dispose(console.log)
  module.hot.accept('./index', () => {
    console.log('is hot reloading');
    require('./index');
  });
}

initMiddleware(express, app, done);

module.exports = app;
