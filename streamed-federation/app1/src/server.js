import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";
import path from "path";
import React from "react";
import serialize from "serialize-javascript";
import ReactDomServer from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { Helmet } from "react-helmet";
import { initializeFederatedImports } from "@module-federation/remote-federation-plugin/lib/s3-federated-imports";
const { performance, PerformanceObserver } = require("perf_hooks");

import routes from "./routes";
import Layout from "./components/Layout";
import createStore, { initializeSession } from "./store";
import AWS from "aws-sdk";
import federatedModules from "../federated-modules";

const app = express();
const port = 3000;
const s3Client = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  endpoint: process.env.S3_ENDPOINT,
  sslEnabled:
    process.env.S3_ENDPOINT === "http://localhost:4568" ? false : true,
  s3ForcePathStyle: true,
});
app.use(express.static(path.resolve(__dirname, "../dist")));
function callback(list, observer) {
  // console.log(list.getEntries());
}
const obs = new PerformanceObserver(callback);
obs.observe({ entryTypes: ["mark", "measure"] });

export async function server(event, context) {
  // const wrapped = performance.timerify(someFunction);

  performance.mark(`initializeFederatedImports: start`);
  await initializeFederatedImports({
    s3Client,
    federatedModules: federatedModules.default,
  });
  performance.mark(`initializeFederatedImports: end`);

  const extraRouteMiddleware = (
    await import("@streamed-federation/federated-middleware/extraRoute")
  ).default;
  performance.mark(`extraRouteMiddleware: end`);
  console.log("extraRouteMiddleware", extraRouteMiddleware);

  performance.measure(
    "initializeFederatedImports",
    "initializeFederatedImports: start",
    "initializeFederatedImports: end"
  );
  performance.measure(
    "extraRouteMiddleware",
    "initializeFederatedImports: end",
    "extraRouteMiddleware: end"
  );
  performance.measure(
    "Federation Timing",
    "initializeFederatedImports: start",
    "extraRouteMiddleware: end"
  );

  app.use("/federated", extraRouteMiddleware);

  app.get("/*", (req, res) => {
    const context = {};
    const store = createStore();

    store.dispatch(initializeSession());

    const dataRequirements = routes
      .filter((route) => matchPath(req.url, route)) // filter matching paths
      .map((route) => route.component) // map to components
      .filter((comp) => comp.serverFetch) // check if components have data requirement
      .map((comp) => store.dispatch(comp.serverFetch())); // dispatch data requirement

    Promise.all(dataRequirements).then(() => {
      const jsx = (
        <ReduxProvider store={store}>
          <StaticRouter context={context} location={req.url}>
            <Layout />
          </StaticRouter>
        </ReduxProvider>
      );
      const reactDom = ReactDomServer.renderToString(jsx);

      const reduxState = store.getState();
      const helmetData = Helmet.renderStatic();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlTemplate(reactDom, reduxState, helmetData));
    });
  });

  app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
  );

  function htmlTemplate(reactDom, reduxState, helmetData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <title>React SSR</title>
            <link rel="stylesheet" type="text/css" href="./client.css" />
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${serialize(reduxState, { isJSON: true })}
            </script>
            <script src="./client.js"></script>
        </body>
        </html>
    `;
  }
}
performance.mark(`server: start`);
server().then(() => {
  performance.mark(`server: end`);
  performance.measure("Server Boot Time", "server: start", "server: end");
});
