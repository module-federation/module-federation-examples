import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { UserState } from 'projects/mdmf-shared/src/lib/app-state/state/user.state';

import { Observable } from 'rxjs';

@Component({
  selector: 'list-user-profile',
  templateUrl: './list-user-profile.component.html',
  styleUrls: ['./list-user-profile.component.css']
})
export class ListUserProfileComponent implements OnInit {

   
  @Select(UserState.getUsers) users: Observable<User[]>;

  ngOnInit() {
  }

}
