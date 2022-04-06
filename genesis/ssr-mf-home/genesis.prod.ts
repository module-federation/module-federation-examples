import express from 'express';

import { app, ssr, startApp } from './genesis';

const renderer = ssr.createRenderer();

app.use(
  renderer.staticPublicPath,
  express.static(renderer.staticDir, {
    immutable: true,
    maxAge: '31536000000',
  }),
);

startApp(renderer);
