import { Action } from "@ngrx/store";

export enum PageTitleActionType {
  SET_TITLE = '[TITLE] SET',
}

export class SetPageTitleAction implements Action {
  readonly type = PageTitleActionType.SET_TITLE;
  constructor(public title: string) {}
}

export type PageTitleSetAction = SetPageTitleAction;
