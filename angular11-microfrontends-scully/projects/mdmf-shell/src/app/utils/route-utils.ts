import { loadRemoteModule } from './federation-utils';
import { Routes } from '@angular/router';
import { Microfrontend } from '../microfrontends/microfrontend.model';
import { APP_ROUTES } from '../app.routes';

export function buildRoutes(options: Microfrontend[]): Routes {
  const lazyRoutes: Routes = options.map(o => ({
    path: o.routePath,
    loadChildren: () => loadRemoteModule(o).then(m => m[o.ngModuleName]),
  }));

  return [...APP_ROUTES, ...lazyRoutes];
}
