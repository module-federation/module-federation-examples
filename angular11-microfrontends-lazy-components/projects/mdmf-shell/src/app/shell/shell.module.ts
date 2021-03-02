import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileRoutingModule } from "./shell-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { MdmfSharedModule } from "projects/mdmf-shared/src/lib/modules/mdmf-shared.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MdmfSharedModule,
  ],
})
export class ShellModule {}
