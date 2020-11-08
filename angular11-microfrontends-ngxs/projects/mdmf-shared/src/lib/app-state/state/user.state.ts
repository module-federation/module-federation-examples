import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { User } from '../models/User';
import { AddUser } from '../actions/user.action';

export class UserStateModel {
    users: User[];
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})
export class UserState { 

    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users;
    }

    @Action(AddUser)
    add({getState, patchState, setState }: StateContext<UserStateModel>, { payload }: AddUser) {
        console.log("Action AddUser reaches the store with payload: ", payload);
        const state = getState();
        if (state && state.users) {
            patchState({
                users: [...state.users, payload]
            });
        }
        else {
            setState({
                users: [payload]
            });
        }    
    }

}