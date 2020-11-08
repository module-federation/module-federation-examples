import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MdmfSharedModule} from '../../../../mdmf-shared/src/public-api';

import { ProfileRoutingModule } from "./profile-routing.module";
import { ListUserProfileComponent } from './components/list-user-profile/list-user-profile.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [ProfileComponent, ListUserProfileComponent],
  imports: [
    CommonModule, 
    ProfileRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),    
    FormsModule,
    ReactiveFormsModule,
    MdmfSharedModule
  ],
})
export class ProfileModule {}
