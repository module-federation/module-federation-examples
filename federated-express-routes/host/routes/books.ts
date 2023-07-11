/* eslint-disable sonarjs/no-duplicate-string */
import { Router, Request } from 'express';
import {books} from '../fixtures';
const routes = Router();
// Add custom routes before JSON Server router
routes.get('/api/books/v1/books', (req, res) => {
  res.jsonp(books);
});

routes.get('/api/books/v1/books/:id', (req, res) => {
  res.jsonp(books[0]);
});

export { routes as booksRoutes };
