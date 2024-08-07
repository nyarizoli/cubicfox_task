import { UserDetailsActionType, UserDetailsSetAction } from "../actions/user-details.action";
import { UserDetails } from "../models/user.model";

const initialState: UserDetails | null = null;

export function UserDetailsReducer(state: UserDetails | null = initialState, action: UserDetailsSetAction) {
  switch (action.type) {
    case UserDetailsActionType.SET_USER_DETAILS:
      return action.userDetails;
    default:
      return state;
  }
}
