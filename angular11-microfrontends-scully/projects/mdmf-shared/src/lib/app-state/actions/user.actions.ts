import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const addUser = createAction("[User] Add User", props<{ user: User }>());
export const removeUser = createAction(
  "[User] Remove User",
  props<{ user: User }>()
);
