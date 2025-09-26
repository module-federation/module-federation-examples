const express = require('express');
const initMiddleware = require('./middleware');
const fetch = require('node-fetch');

const app = express();
const PORT = 4002;

async function waitUrl(url, timeout = 300000) {
  const start = Date.now();
  while (true) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch (_) {}
    if (Date.now() - start > timeout) {
      try {
        const { execSync } = require('node:child_process');
        const ss = execSync(`ss -ltnp | grep :${new URL(url).port} || true`, { stdio: ['ignore','pipe','ignore'] }).toString().trim();
        if (ss) console.log(`[prewarm] port diag ${new URL(url).port}: ${ss}`);
      } catch {}
      throw new Error(`prewarm timeout for ${url}`);
    }
    await new Promise(r => setTimeout(r, 5000));
  }
}

const done = async () => {
  await Promise.all([
    waitUrl('http://localhost:3005/server/remoteEntry.js'),
    waitUrl('http://localhost:3002/server/remoteEntry.js'),
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
