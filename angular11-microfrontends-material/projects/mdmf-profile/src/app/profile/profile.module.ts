import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleDialogModule } from '../simple-dialog/simple-dialog.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ProfileRoutingModule,
        MatButtonModule,
        SimpleDialogModule
    ],
})
export class ProfileModule {
}
