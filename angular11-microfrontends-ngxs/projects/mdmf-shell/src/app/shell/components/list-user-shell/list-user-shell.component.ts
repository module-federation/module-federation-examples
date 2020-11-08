import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { UserState } from 'projects/mdmf-shared/src/lib/app-state/state/user.state';

import { Observable } from 'rxjs';

@Component({
  selector: 'list-user-shell',
  templateUrl: './list-user-shell.component.html',
  styleUrls: ['./list-user-shell.component.css']
})
export class ListUserShellComponent implements OnInit {

   
  @Select(UserState.getUsers) users: Observable<User[]>;

  ngOnInit() {
  }

}
