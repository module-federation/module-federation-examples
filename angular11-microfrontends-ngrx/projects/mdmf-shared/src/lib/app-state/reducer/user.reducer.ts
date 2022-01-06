import { createReducer, on } from '@ngrx/store';
import { UserActions } from 'projects/mdmf-shared/src/lib/app-state/actions';
import { User } from '../models/User';

export const userFeatureKey = 'user';

export class UserStateModel {
  users: User[];
}

const initialState: UserStateModel = {
  users: [],
};

export const reducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, { user }) => ({
    users: [...state.users, user],
  })),
  on(UserActions.removeUser, (state, { user }) => ({
    users: state.users.filter(u => !(u.email === user.email && u.name === user.name)),
  })),
);

export const selectUsers = (state: UserStateModel) => state.users;
