import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCitiesHomeComponent } from './client-cities-home/client-cities-home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ClientCitiesHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientCitiesRoutingModule {}
