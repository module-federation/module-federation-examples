import path from 'path';

function middleware(express, app, done) {
  // static path where files such as images and js will be served from
  app.use('/static', express.static(path.join(process.cwd(), 'dist/client')));

  // =================== WARNING ===================
  // ATTENTION this will expose ALL server files
  // =================== WARNING ===================
  app.use('/server', express.static(path.join(process.cwd(), 'dist/server')));

  const renderThunk = require('./server-entry').default;
  const serverRender = renderThunk();
  app.get('/*', serverRender);

  done();
}

export default middleware;
