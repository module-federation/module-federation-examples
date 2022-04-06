import { MF, Renderer, SSR } from '@fmfe/genesis-core';
import express from 'express';
import path from 'path';

export const app = express();

export const ssr = new SSR({
  name: 'ssr-mf-home',
  build: {
    extractCSS: false,
  },
});

export const mf = new MF(ssr, {
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
  exposes: {
    './src/common/create-app-client': 'src/common/create-app-client.ts',
    './src/common/create-app': 'src/common/create-app.ts',
  },
  remotes: [
    {
      name: 'ssr-mf-about',
      clientOrigin: 'http://localhost:3002',
      serverOrigin: 'http://localhost:3002',
    },
  ],
  typesDir: path.resolve('./types/ssr-mf-about'),
});

export const startApp = (renderer: Renderer) => {
  mf.remote.init(renderer);
  mf.remote.polling();
  app.get('/', async (req, res, next) => {
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
  app.listen(3001, () => console.log(`http://localhost:3001`));
};
