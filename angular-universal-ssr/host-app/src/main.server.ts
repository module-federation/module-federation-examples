import { enableProdMode } from "@angular/core";

import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

import("clientApp/Component").then((x) => {
  console.log(x);
  return x;
});

export { AppServerModule } from "./app/app.server.module";
export { renderModule, renderModuleFactory } from "@angular/platform-server";
