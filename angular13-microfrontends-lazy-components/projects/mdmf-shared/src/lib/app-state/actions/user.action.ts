import { User } from '../models/User';

/**
 * Action to add an user
 */
export class AddUser {
  static readonly type = '[User] Add';

  constructor(public payload: User) {}
}

/**
 * Action to remove an user
 */
export class RemoveUser {
  static readonly type = '[User] Remove';

  constructor(public payload: User) {}
}
