import { Store } from "@ngrx/store";
import {State} from "../../store/models/state.model";
import {SetLoadingAction} from "../../store/actions/loading.action";
import {SetPageTitleAction} from "../../store/actions/page-title.action";
import { UserDetails } from "../../store/models/user.model";
import { SetUserDetailsAction } from "../../store/actions/user-details.action";

export abstract class StoreManagerComponent {
  constructor(protected store: Store<State>) {}

  setLoading(loading: boolean): void {
    this.store.dispatch(new SetLoadingAction(loading));
  }

  setPageTitle(title: string): void {
    this.store.dispatch(new SetPageTitleAction(title));
  }

  setUserDetails(userDetails: UserDetails | null): void {
    this.store.dispatch(new SetUserDetailsAction(userDetails));
  }
}
