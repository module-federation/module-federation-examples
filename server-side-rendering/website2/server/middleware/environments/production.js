const fs = require('fs');
const path = require('path');
const config = require('../../../build/config');
const fetch = require('node-fetch').default;

const { serverPath, clientPath, publicPath } = config[process.env.NODE_ENV || 'production'];

// Production specific middleware for express
module.exports = async (express, app, done) => {
  app.use('/static', express.static(path.join(__dirname, '../buildClient/static')));
  try {
    fetch('http://localhost:3001/restart');
  } catch (e) {
    console.error(e);
  }

  const rederThunk = require('../../server-entry').default; // eslint-disable-line import/no-unresolved
  const clientStats = JSON.parse(fs.readFileSync(`${serverPath}/stats.json`, 'utf8'));
  try {
    // static path where files such as images will be served from
    const serverRemder = rederThunk({ clientStats });
    app.get('/*', serverRemder);
  } catch (e) {
    throw new Error('Cant find webpack client stats file');
  }

  done();
};
