import express from 'express';
import initMiddleware from './middleware';

const app = express();
const PORT = 3001;

const done = () => {
  app.listen(PORT, () => {
    console.info(
      `[${new Date().toISOString()}]`,
      `Shell App is running: 🌎 http://localhost:${PORT}`,
    );
  });
};

initMiddleware(express, app, done);

export default app;
