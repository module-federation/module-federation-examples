import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ClientHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
