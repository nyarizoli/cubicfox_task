export interface UserItem {
  FirstName: string;
  LastName: string;
  Email: string;
  FullName: string;
}

export interface UserDetails extends UserItem {
  Id: string;
}
