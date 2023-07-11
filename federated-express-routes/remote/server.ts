import express from 'express';
import { userRoutes } from './routes';
/* eslint-disable */
const listEndpoints = require('express-list-endpoints');

const server = express();

server.use(express.static('build'))
server.use(userRoutes);
server.get('/', (req, res) => {
  res.send(listEndpoints(server));
});

export { server };
