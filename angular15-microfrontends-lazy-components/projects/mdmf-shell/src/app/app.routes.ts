import { Routes } from '@angular/router';
import { HomeComponent } from './shell/components/home/home.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./shell/shell-routing.module').then(m => m.ProfileRoutingModule),
  },
];
