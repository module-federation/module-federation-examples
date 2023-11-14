import express from "express";
import { createRequestHandler } from "@remix-run/express";
import cors from 'cors';

import * as build from "@remix-run/dev/server-build.js";

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use('/server', express.static("build"));
app.all("*", createRequestHandler({ build }));

app.listen(3001, () => {
  console.log(`Server started at http://localhost:3001`);
});

export default app;
