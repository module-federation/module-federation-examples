import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellRoutingModule } from './shell-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { MdmfSharedModule } from 'projects/mdmf-shared/src/lib/modules/mdmf-shared.module';

@NgModule({
  declarations: [HomeComponent, ListUserComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    MdmfSharedModule,
  ],
})
export class ShellModule {}
