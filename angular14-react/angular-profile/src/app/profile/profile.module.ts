import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ListUserComponent } from './components/list-user/list-user.component';

const EXPORTS = [ListUserComponent];

@NgModule({
  declarations: [ProfileComponent, ListUserComponent, ...EXPORTS],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [...EXPORTS],
})
export class ProfileModule {
  static exports = EXPORTS; // prevents from components being tree-shaked in production
}
