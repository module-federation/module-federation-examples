import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from 'projects/mdmf-shared/src/lib/app-state/actions';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { selectUsers } from 'projects/mdmf-shared/src/lib/app-state/reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  users: Observable<User[]> = this.store.select(selectUsers);
  angForm: FormGroup;

  ngOnInit(): void {}

  constructor(private fb: FormBuilder, private store: Store) {
    this.angForm = this.createForm();
  }

  /**
   * Initialize the form
   */
  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  /**
   * Handle the add user when the 'Create User' button is clicked
   * @param name: user's name
   * @param email: user's email
   */
  addUser(name: string, email: string): void {
    this.store.dispatch(UserActions.addUser({ user: { name, email } }));
  }
}
