import express from 'express';
import initMiddleware from './middleware';

const app = express();
const PORT = 3000;

app.get('/api/user', async (req, res) => {
  try {
    // loads the userRoute route function from another app2
    const federatedUserRoute = (await import('app2/userRoute')).userRoute;
    // calls the userRoute function
    await federatedUserRoute(req, res);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});
// Or in a more direct way
// app.get('/api/user', async (...args) => (await import('app2/userRoute')).userRoute(args[0], args[1]));

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
