import { User } from '../models/User';

export class AddUser {
    static readonly type = '[User] Add';

    constructor(public payload: User) {}
}

export class RemoveUser {
    static readonly type = '[User] Remove';

    constructor(public payload: User) {}
}