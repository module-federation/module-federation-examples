import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdmfSharedModule } from '../../../../mdmf-shared/src/public-api';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ListUserComponent } from './components/list-user/list-user.component';

@NgModule({
  declarations: [ProfileComponent, ListUserComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    // StoreDevtoolsModule,
    FormsModule,
    ReactiveFormsModule,
    MdmfSharedModule,
  ],
})
export class ProfileModule {}
