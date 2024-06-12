import createServer from "./server.js";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = createServer();

// Serve static files
const isProd = process.env.NODE_ENV === "production";
const cacheControl = isProd ? "public, max-age=86400" : "no-store";
const setHeaders = (res) => {
  res.setHeader("Cache-Control", cacheControl);
};

const onNotFound = (path, c) =>
  console.log(`${path} is not found, request to ${c.req.path}`);

app.use("/cdn/*", serveStatic({ root: "./public/", setHeaders, onNotFound }));
["explore", "decide", "checkout"].forEach((team) => {
  app.use(
    `/${team}/static/*`,
    serveStatic({ root: `./public/`, setHeaders, onNotFound }),
  );
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
