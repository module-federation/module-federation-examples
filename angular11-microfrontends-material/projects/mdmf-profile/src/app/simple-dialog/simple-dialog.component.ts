import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-simple-dialog',
    templateUrl: './simple-dialog.component.html',
    styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<SimpleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
    }

    ngOnInit() {

    }


    save() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }
}
