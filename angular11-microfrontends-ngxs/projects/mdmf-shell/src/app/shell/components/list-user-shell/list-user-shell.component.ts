import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RemoveUser } from 'projects/mdmf-shared/src/lib/app-state/actions/user.action';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { UserState } from 'projects/mdmf-shared/src/lib/app-state/state/user.state';


import { Observable } from 'rxjs';

@Component({
  selector: 'list-user-shell',
  templateUrl: './list-user-shell.component.html',
  styleUrls: ['./list-user-shell.component.css']
})
export class ListUserShellComponent implements OnInit {
  
  constructor(private store: Store) {}
  ngOnInit() {}

  @Select(UserState.getUsers) users: Observable<User[]>;

  removeUser(user: User) {
    this.store.dispatch(new RemoveUser(user));
  }

}
