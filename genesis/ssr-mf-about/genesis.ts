import { MF, Renderer, SSR } from '@fmfe/genesis-core';
import express from 'express';
import path from 'path';

export const app = express();

export const ssr = new SSR({
  name: 'ssr-mf-about',
  build: {
    extractCSS: false,
  },
});

export const mf = new MF(ssr, {
  exposes: {
    './src/routes': './src/routes.ts',
  },
  remotes: [
    {
      name: 'ssr-mf-home',
      clientOrigin: 'http://localhost:3001',
      serverOrigin: 'http://localhost:3001',
    },
  ],
  shared: {
    vue: {
      singleton: true,
    },
    'vue-router': {
      singleton: true,
    },
    'vue-meta': {
      singleton: true,
    },
  },
  typesDir: path.resolve('./types/ssr-mf-about'),
});

app.get(mf.manifestRoutePath, async (req, res, next) => {
  const t = Number(req.query.t);
  const maxAwait = 1000 * 60;
  await mf.exposes.getManifest(t, maxAwait);
  next();
});

export const startApp = (renderer: Renderer) => {
  mf.remote.init(renderer);
  mf.remote.polling();
  app.get('/about', async (req, res, next) => {
    try {
      const result = await renderer.renderHtml({
        req,
        res,
      });
      res.send(result.data);
    } catch (e) {
      next(e);
    }
  });
  app.listen(3002, () => console.log(`http://localhost:3002`));
};
