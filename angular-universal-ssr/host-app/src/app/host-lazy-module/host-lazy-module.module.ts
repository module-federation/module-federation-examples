import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostLazyModuleRoutingModule } from './host-lazy-module-routing.module';
import { HostLazyHomeComponent } from './host-lazy-home/host-lazy-home.component';

@NgModule({
  declarations: [HostLazyHomeComponent],
  imports: [CommonModule, HostLazyModuleRoutingModule],
})
export class HostLazyModuleModule {}
