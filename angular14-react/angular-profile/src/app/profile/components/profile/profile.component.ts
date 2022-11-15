import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddUser } from '../../user-state/actions/user.action';
import { IUser } from '../../user-state/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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
    this.store.dispatch(new AddUser({ name, email } as IUser));
  }

  /**
   * Get the users for unit testing purposes
   */
  getUsers(): IUser[] {
    return this.store.selectSnapshot<IUser[]>(state => state.users.users);
  }
}
