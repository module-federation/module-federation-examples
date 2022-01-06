import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { UserActions } from 'projects/mdmf-shared/src/lib/app-state/actions';
import { Observable } from 'rxjs';
import { selectUsers } from 'projects/mdmf-shared/src/lib/app-state/reducer';

@Component({
  selector: 'app-profile-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  users: Observable<User[]> = this.store.select(selectUsers);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  /**
   * Handle the remove user when the "Remove User" button is clicked
   * @param user: the user info
   */
  removeUser(user: User): void {
    this.store.dispatch(UserActions.removeUser({ user }));
  }
}
