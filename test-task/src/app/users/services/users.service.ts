import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { USER_LIST_ENDPOINT, USER_LIST_SEARCH_ENDPOINT } from '../../utils/constants/endpoints/users/constants';
import { UserItem } from '../../store/models/user.model';
import { ABSENCES_DEFINITION_LIST_ENDPOINT, ABSENCES_LIST_ENDPOINT } from '../../utils/constants/endpoints/absences/constants';
import { AbsenceCreateItem, AbsenceDefinitionItem, AbsenceItem } from '../../store/models/absence.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getUserList(): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(USER_LIST_ENDPOINT);
  }

  searchUserList(searchTerm: string): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(`${USER_LIST_SEARCH_ENDPOINT}?searchTerm=${searchTerm}`);
  }

  addUser(userToAdd: UserItem): Observable<any> {
    return this.http.post(USER_LIST_ENDPOINT, userToAdd);
  }

  getUserAbsenceList(searchTerm: string): Observable<AbsenceItem[]> {
    return this.http.get<AbsenceItem[]>(`${ABSENCES_LIST_ENDPOINT}?searchTerm=${searchTerm}`).pipe(map((data: AbsenceItem[]) => this.mapListData(data)));
  }

  getAbsenceDefinitionList(): Observable<AbsenceDefinitionItem[]> {
    return this.http.get<AbsenceDefinitionItem[]>(ABSENCES_DEFINITION_LIST_ENDPOINT);
  }

  createAbsence(toSave: AbsenceCreateItem): Observable<any> {
    return this.http.post(ABSENCES_LIST_ENDPOINT, toSave);
  }

  private mapListData(data: AbsenceItem[]): AbsenceItem[] {
    if (data) {
      return data.map((item: AbsenceItem) => {
        return {
          ...item,
          Timestamp: `${new Date(item.Timestamp).toLocaleDateString('hu-HU')} ${new Date(item.Timestamp).toLocaleTimeString('hu-HU')}`,
          InsertedOn: `${new Date(item.InsertedOn).toLocaleDateString('hu-HU')} ${new Date(item.InsertedOn).toLocaleTimeString('hu-HU')}`
        }
      })
    } else {
      return [];
    }
  }
}
