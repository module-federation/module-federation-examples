import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdmfSharedModule } from "../../../../mdmf-shared/src/public-api";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./components/profile/profile.component";
import { ListUserComponent } from "./components/list-user/list-user.component";

const EXPORTS = [
  ListUserComponent
];

@NgModule({
  declarations: [ProfileComponent, ...EXPORTS],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MdmfSharedModule,
  ],
  exports: [...EXPORTS],
})
export class ProfileModule {
  static exports = EXPORTS; // prevents from components being tree-shaked in production
}
