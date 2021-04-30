import { Component, OnInit } from '@angular/core';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    constructor(private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    openDialog() {
        const dialogRef = this.dialog.open(SimpleDialogComponent);
        dialogRef.afterClosed().subscribe(
            val => console.log('Dialog output:', val)
        );
    }
}
