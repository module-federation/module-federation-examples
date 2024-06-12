import createServer from "./server.js";
import { serveStatic } from "hono/cloudflare-workers";
import manifest from "__STATIC_CONTENT_MANIFEST";

const app = createServer();

app.use("/cdn/*", serveStatic({ root: "./", manifest }));
["explore", "decide", "checkout"].forEach((team) => {
  app.use(`/${team}/static/*`, serveStatic({ root: `./`, manifest }));
});

export default app;
