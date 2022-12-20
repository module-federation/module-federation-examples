import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RemoveUser } from 'projects/mdmf-shared/src/lib/app-state/actions/user.action';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { UserState } from 'projects/mdmf-shared/src/lib/app-state/state/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  exportAs: 'ListUserComponent',
})
export class ListUserComponent implements OnInit {
  @Select(UserState.getUsers) users: Observable<User[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  /**
   * Handle the remove user when the "Remove User" button is clicked
   * @param user: the user info
   */
  removeUser(user: User): void {
    this.store.dispatch(new RemoveUser(user));
  }

  /**
   * Get the users for unit testing purposes
   */
  getUsers(): User[] {
    return this.store.selectSnapshot<User[]>(state => state.users.users);
  }
}
