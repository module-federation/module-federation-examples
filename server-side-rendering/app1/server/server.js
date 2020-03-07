import App from "../src/App";
import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import fs from "fs";
import path from "path";

const PORT = 3001;
const app = express();
const router = express.Router();

function handleRender(req, res) {
  const html = ReactDOMServer.renderToString(<App />);

  fs.readFile(
    path.resolve(__dirname, "../public/index.html"),
    "utf8",
    (err, data) => {
      if (err) throw err;

      const document = data.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      );

      res.send(document);
    }
  );
}

router.use("^/$", handleRender);

router.use(
  express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
