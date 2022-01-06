import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AddUser, RemoveUser } from '../actions/user.action';
import { User } from '../models/User';
import { UserState } from './user.state';

describe('UserState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UserState])],
    });

    store = TestBed.inject(Store);
  });

  it('it should add an user', () => {
    const user: User = { name: 'Mr. A', email: 'a@company.com' };
    store.dispatch(new AddUser(user));
    const users: User[] = store.selectSnapshot<User[]>(state => state.users.users);
    expect(users.includes(user)).toBeTruthy();
  });

  it('it should remove an user', () => {
    const initUsers: User[] = [
      { name: 'Mr. A', email: 'a@company.com' },
      { name: 'Mr. B', email: 'b@company.com' },
      { name: 'Mr. C', email: 'c@company.com' },
    ];
    store.reset({ users: { users: initUsers } });

    const user: User = { name: 'Mr. B', email: 'b@company.com' };
    store.dispatch(new RemoveUser(user));
    const users: User[] = store.selectSnapshot<User[]>(state => state.users.users);
    expect(users.includes(user)).toBeFalsy();
  });
});
