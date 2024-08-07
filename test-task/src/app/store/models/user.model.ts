export interface UserCreate {
  FirstName: string;
  LastName: string;
  Email: string;
}

export interface UserDetails extends UserCreate {
  Id: string;
  FullName: string;
}
