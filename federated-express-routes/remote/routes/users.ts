/* eslint-disable sonarjs/no-duplicate-string */
import { Router, Request } from 'express';
import { user } from '../fixtures';

const routes = Router();
// Add custom routes before JSON Server router
routes.post('/api/users/v1/login', (req, res) => {
  res.jsonp(user);
});

routes.post('/api/users/v1/users', (req, res) => {
  res.jsonp([user, user]);
});

export { routes as userRoutes };
