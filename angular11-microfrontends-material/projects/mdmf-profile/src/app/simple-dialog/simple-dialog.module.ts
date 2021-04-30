import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDialogComponent } from './simple-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [SimpleDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [SimpleDialogComponent],
    entryComponents: [SimpleDialogComponent]
})
export class SimpleDialogModule {
}
