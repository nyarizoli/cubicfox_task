import { LoadingActionType, LoadingSetAction } from "../actions/loading.action";

const initialState: boolean = false;

export function LoadingReducer(state: boolean = initialState, action: LoadingSetAction) {
  switch (action.type) {
    case LoadingActionType.SET_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}
