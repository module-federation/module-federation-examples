const fs = require('fs');
const path = require('path');
const express = require('express');
const { createServer: createViteServer } = require('vite');

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production') {
  const app = express();
  const resolve = p => path.resolve(__dirname, p);
  const indexProd = isProd ? fs.readFileSync(resolve('dist/index.html'), 'utf-8') : '';

  let vite;
  if (!isProd) {
    vite = await createViteServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
    });
    app.use(vite.middlewares);
  } else {
    app.use(require('compression')());
    app.use(
      require('serve-static')(resolve('dist'), {
        index: false,
      }),
    );
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = indexProd;
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
}

createServer();
