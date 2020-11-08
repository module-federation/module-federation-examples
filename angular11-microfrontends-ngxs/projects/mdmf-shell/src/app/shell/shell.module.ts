import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MdmfSharedModule} from '../../../../mdmf-shared/src/public-api';

import { ProfileRoutingModule } from "./shell-routing.module";
import { HomeComponent } from './components/home/home.component';
import { ListUserShellComponent } from './components/list-user-shell/list-user-shell.component';

@NgModule({
  declarations: [HomeComponent, ListUserShellComponent],
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
