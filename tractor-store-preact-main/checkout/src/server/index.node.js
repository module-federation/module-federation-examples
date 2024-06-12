import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import createApp from "./index.jsx";

const app = createApp((app) => {
  app.use("/checkout/static/*", serveStatic({ root: "./public/" }));
});

serve({ fetch: app.fetch, port: 3003 }, (info) => {
  console.log(`checkout http://localhost:${info.port}/`);
});
