import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'lazy',
    pathMatch: 'full',
    loadChildren: () =>
      import('./host-lazy-module/host-lazy-module.module').then(x => x.HostLazyModuleModule),
  },
  {
    path: 'federation',
    loadChildren: () => import('clientApp/Module').then(x => x.ClientCitiesModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledNonBlocking'
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
