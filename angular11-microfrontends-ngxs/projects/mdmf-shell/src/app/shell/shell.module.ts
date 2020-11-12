import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from "./shell-routing.module";
import { HomeComponent } from './components/home/home.component';
import { ListUserShellComponent } from './components/list-user-shell/list-user-shell.component';
import { MdmfSharedModule } from 'projects/mdmf-shared/src/lib/mdmf-shared.module';

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
  exports: [HomeComponent, ListUserShellComponent]
})
export class ShellModule {}
