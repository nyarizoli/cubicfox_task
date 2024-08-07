export interface AbsenceItem {
  AbsenceDefinitionName: string;
  Timestamp: string | Date;
  InsertedOn: string | Date;
}

export interface AbsenceListItem extends AbsenceItem {
  FirstName: string;
  LastName: string;
}

export interface AbsenceDefinitionItem {
  CategoryDefinitionId: string;
  CategoryDefinitionName: string;
  Name: string;
  Id: string;
}

export interface AbsenceCreateItem {
  UserId: string;
  Timestamp: string | Date,
  AbsenceDefinitionId: string,
  Origin: number,
  Comment: string,
  PartialTimeFrom: string | Date,
  PartialTimeTo: string | Date,
  PartialTimeDuration: number,
  IsPartial: boolean,
  OverrideHolidayAbsence: boolean
}
