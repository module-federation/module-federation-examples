import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleDialogModule } from '../simple-dialog/simple-dialog.module';

@NgModule({
    declarations: [ProfileComponent],
    imports: [CommonModule, BrowserAnimationsModule, ProfileRoutingModule, SimpleDialogModule],
})
export class ProfileModule {
}
