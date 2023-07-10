import http from 'http';
import { server } from './server';

const httpServer = http.createServer(server);
const SERVER_PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || 'localhost';
const PROTOCOL = process.env.PROTOCOL || 'http';

/* eslint-disable */
const expressListRoutes = require('express-list-routes');

export function start({ PORT = SERVER_PORT } = {}) {
  httpServer.listen(PORT, () => {
    console.log(`Registered routes:`);
    expressListRoutes(server);
    // eslint-disable-next-line no-console
    console.log(`JSON Server is running ${PROTOCOL}://${HOST}:${PORT}`);
  });
}

export function stop() {
  httpServer.close();
}
