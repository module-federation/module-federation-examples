import { Watch } from '@fmfe/genesis-compiler';

import { app, ssr, startApp } from './genesis';

const start = async () => {
  const watch = new Watch(ssr);
  await watch.start();
  const renderer = watch.renderer;
  app.use(watch.devMiddleware);
  app.use(watch.hotMiddleware);
  startApp(renderer);
};
start();
