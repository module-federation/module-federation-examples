const client = require('./webpack/client-app');
const clientSsr = require('./webpack/client-ssr');

module.exports = [client, clientSsr];
