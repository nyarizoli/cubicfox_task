import { ActionReducerMap } from "@ngrx/store";
import { LoadingReducer } from "./loading.reducer";
import { PageTitleReducer } from "./page-title.reducer";
import { State } from "../models/state.model";
import { UserDetailsReducer } from "./user-details.reducer";

export const REDUCERS: ActionReducerMap<State, any> = {
  isLoading: LoadingReducer,
  pageTitle: PageTitleReducer,
  userDetails: UserDetailsReducer
};
