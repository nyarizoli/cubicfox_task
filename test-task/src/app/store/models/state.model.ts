import { UserDetails } from "./user.model";

export interface State {
  readonly isLoading: boolean;
  readonly pageTitle: string;
  readonly userDetails: UserDetails | null;
}
