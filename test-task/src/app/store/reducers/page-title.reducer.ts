import { PageTitleActionType, PageTitleSetAction } from "../actions/page-title.action";

const initialState: string = 'Settings';

export function PageTitleReducer(state: string = initialState, action: PageTitleSetAction) {
  switch (action.type) {
    case PageTitleActionType.SET_TITLE:
      return action.title;
    default:
      return state;
  }
}
