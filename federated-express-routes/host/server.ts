import express from 'express';
import { booksRoutes } from './routes';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { userRoutes } from 'RemoteRoutes/Users';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const listEndpoints = require('express-list-endpoints');

const server = express();
server.use(express.static('build'));

server.use(booksRoutes);
server.use(userRoutes);
server.get('/', (req, res) => {
  res.send(listEndpoints(server));
});

export { server };
