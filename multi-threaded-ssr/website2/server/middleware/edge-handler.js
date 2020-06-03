const { renderToString } = require("react-dom/server");
const express = require("express");

const createRemoteEntry = require("./remote-entry");
const createEdgeChunks = require("./edge-chunks");

function createEdgeHandler(modules) {
  const app = express();

  const remoteEntry = createRemoteEntry(modules);

  app.get("/remote-entry.js", (req, res) => {
    res.setHeader("Content-Type", "text/javascript");
    res.status(200).send(remoteEntry);
  });

  createEdgeChunks(app, modules);

  return app;
}

module.exports = createEdgeHandler;
