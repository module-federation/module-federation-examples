import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../models/User';
import { AddUser, RemoveUser } from '../actions/user.action';
import { Injectable } from '@angular/core';

export class UserStateModel {
  users: User[];
}

/**
 * The UserState
 */
@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
  },
})
@Injectable()
export class UserState {
  /**
   * Selector to get users from the application state
   * @param state: the application state
   */
  @Selector()
  static getUsers(state: UserStateModel): User[] {
    return state.users;
  }

  /**
   * Add an user to the application state
   *
   * @param param0: state context
   * @param param1: playload of AddUser action
   */
  @Action(AddUser)
  add(
    { getState, patchState, setState }: StateContext<UserStateModel>,
    { payload }: AddUser,
  ): void {
    const state = getState();
    if (state && state.users) {
      patchState({
        users: [...state.users, payload],
      });
    } else {
      setState({
        users: [payload],
      });
    }
  }

  /**
   * Remove an user from the application state
   *
   * @param param0: state context
   * @param param1: playload of AddUser action
   */
  @Action(RemoveUser)
  remove({ getState, setState }: StateContext<UserStateModel>, { payload }: AddUser): void {
    const state = getState();
    if (state && state.users) {
      setState({
        users: state.users.filter(u => !(u.email === payload.email && u.name === payload.name)),
      });
    }
  }
}
