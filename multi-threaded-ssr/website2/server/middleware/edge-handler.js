import { renderToString } from "react-dom/server";
import express from "express";

import createRemoteEntry from "./remote-entry";
import createEdgeChunks from "./edge-chunks";

function createEdgeHandler(modules) {
  const app = express();

  const remoteEntry = createRemoteEntry(modules);

  app.use("/remote-entry", (req, res) => {
    res.setHeader("Content-Type", "text/javascript");
    res.status(200).send(remoteEntry);
  });

  createEdgeChunks(app, modules);

  return app;
}

export default createEdgeHandler;
