import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostLazyHomeComponent } from './host-lazy-home/host-lazy-home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HostLazyHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostLazyModuleRoutingModule {}
