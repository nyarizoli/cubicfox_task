import { Action } from "@ngrx/store";

export enum LoadingActionType {
  SET_LOADING = '[LOADING] SET',
}

export class SetLoadingAction implements Action {
  readonly type = LoadingActionType.SET_LOADING;
  constructor(public isLoading: boolean) {}
}

export type LoadingSetAction = SetLoadingAction;
