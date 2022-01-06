import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shell/components/home/home.component';
import { loadRemoteModule } from './utils/federation-utils';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'profile',
    loadChildren: () =>
      loadRemoteModule({
        remoteName: 'profile',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: 'ProfileModule',
      }).then(m => m.ProfileModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      loadRemoteModule({
        remoteName: 'product',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: 'ProductModule',
      }).then(m => m.ProductModule),
  },
  // debug test:
  /*
  {
    path: "product",
    loadChildren: () =>
      import("./../../../mdmf-product/src/app/product/product.module").then((m) => m.ProductModule),
  },
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
