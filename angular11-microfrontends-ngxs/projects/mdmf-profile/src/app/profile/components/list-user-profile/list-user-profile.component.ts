import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RemoveUser } from 'projects/mdmf-shared/src/lib/app-state/actions/user.action';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { UserState } from 'projects/mdmf-shared/src/lib/app-state/state/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'list-user-profile',
  templateUrl: './list-user-profile.component.html',
  styleUrls: ['./list-user-profile.component.css']
})
export class ListUserProfileComponent implements OnInit {

  constructor(private store: Store) {}
  ngOnInit() {}

  @Select(UserState.getUsers) users: Observable<User[]>;

  /**
   * Handle the remove user when the "Remove User" button is clicked
   * @param user 
   */
  removeUser(user: User) {
    this.store.dispatch(new RemoveUser(user));
  }

  /**
   * Get the users for unit testing purposes
   */
  getUsers() {
    return this.store.selectSnapshot<User []>((state) => state.users.users);
  }

}
