export interface AbsenceItem {
  AbsenceDefinitionName: string;
  Timestamp: string | Date;
  InsertedOn: string | Date;
}

export interface AbsenceListItem extends AbsenceItem {
  FirstName: string;
  LastName: string;
}
