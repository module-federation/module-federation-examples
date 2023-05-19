const path = require('path');

module.exports = (express, app, done) => {
  // static path where files such as images and js will be served from
  app.use('/static', express.static("./dist/client"));

  const renderThunk = require('./server-entry').default;
  const serverRender = renderThunk();
  app.get('/*', serverRender);

  done();
};
