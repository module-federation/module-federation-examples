import express from 'express';
const app = express();
app.use((req, res) => res.send('Hello Federated Route Middleware!'));
export default app;
