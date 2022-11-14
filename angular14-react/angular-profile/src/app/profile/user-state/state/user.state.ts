import { IUser } from '../models/User';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddUser, RemoveUser } from '../actions/user.action';
import { container } from 'webpack';

export class UserStateModel {
  users!: IUser[];
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
  static getUsers(state: UserStateModel): IUser[] {
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
    if (state?.users) {
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
    if (state?.users) {
      setState({
        users: state.users.filter(u => !(u.email === payload.email && u.name === payload.name)),
      });
      console.log(
        'state',
        payload,
        state.users.filter(u => !(u.email == payload.email && u.name == payload.name)),
      );
    }
  }
}
