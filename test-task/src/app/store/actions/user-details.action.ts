import { Action } from "@ngrx/store";
import { UserDetails } from "../models/user.model";

export enum UserDetailsActionType {
  SET_USER_DETAILS = '[DETAILS] SET',
}

export class SetUserDetailsAction implements Action {
  readonly type = UserDetailsActionType.SET_USER_DETAILS;
  constructor(public userDetails: UserDetails | null) {}
}

export type UserDetailsSetAction = SetUserDetailsAction;
