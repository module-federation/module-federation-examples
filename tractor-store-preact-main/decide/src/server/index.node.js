import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import createApp from "./index.jsx";

const app = createApp((app) => {
  app.use("/decide/static/*", serveStatic({ root: "./public/" }));
});

serve({ fetch: app.fetch, port: 3002 }, (info) => {
  console.log(`decide http://localhost:${info.port}/`);
});
