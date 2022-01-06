export default async (express, app, done) => {
  const renderThunk = require('./serverEntry').default;

  const serverRender = renderThunk();
  app.get('/*', serverRender);

  done();
};
