import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import createApp from "./index.jsx";

const app = createApp((app) => {
  app.use("/explore/static/*", serveStatic({ root: "./public/" }));
});

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`explore http://localhost:${info.port}/`);
});
