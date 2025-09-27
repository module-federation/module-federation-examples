const express = require('express');
const initMiddleware = require('./middleware');
const fetch = require('node-fetch');
const { sanitizeLoopbackHttpUrl } = require('../../../server-utils/loopback');

const app = express();
const PORT = 4004;

async function waitUrl(url, timeout = 300000) {
  const target = sanitizeLoopbackHttpUrl(url);
  const start = Date.now();
  while (true) {
    try {
      const res = await fetch(target.href);
      if (res.ok) return;
    } catch (_) {}
    if (Date.now() - start > timeout) {
      try {
        const { execSync } = require('node:child_process');
        const ss = execSync(`ss -ltnp | grep :${target.port} || true`, { stdio: ['ignore','pipe','ignore'] }).toString().trim();
        if (ss) console.log(`[prewarm] port diag ${target.port}: ${ss}`);
      } catch {}
      throw new Error(`prewarm timeout for ${target.href}`);
    }
    await new Promise(r => setTimeout(r, 5000));
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
