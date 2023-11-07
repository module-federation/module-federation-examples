import express from "express";
import { createRequestHandler } from "@remix-run/express";

import * as build from "@remix-run/dev/server-build.js";

const app = express();
app.use(express.static("public"));
app.all("*", createRequestHandler({ build }));

app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
