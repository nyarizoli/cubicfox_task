import { Injectable } from '@angular/core';
import { UsersModule } from '../users.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { USER_LIST_ENDPOINT, USER_LIST_SEARCH_ENDPOINT } from '../../utils/constants/endpoints/users/constants';
import { AuthService } from '../../services/auth.service';
import { UserItem } from '../../store/models/user.model';
import { ABSENCES_DEFINITION_LIST_ENDPOINT, ABSENCES_LIST_ENDPOINT } from '../../utils/constants/endpoints/absences/constants';
import { AbsenceCreateItem, AbsenceDefinitionItem, AbsenceItem } from '../../store/models/absence.model';

@Injectable({
  providedIn: UsersModule
})
export class UsersService {

  httpHeaders!: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${this.authService.getToken()}`,
    });
  }

  getUserList(): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(USER_LIST_ENDPOINT, {headers: this.httpHeaders});
  }

  searchUserList(searchTerm: string): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(`${USER_LIST_SEARCH_ENDPOINT}?searchTerm=${searchTerm}`, {headers: this.httpHeaders});
  }

  addUser(userToAdd: UserItem): Observable<any> {
    return this.http.post(USER_LIST_ENDPOINT, userToAdd, {headers: this.httpHeaders});
  }

  getUserAbsenceList(searchTerm: string): Observable<AbsenceItem[]> {
    return this.http.get<AbsenceItem[]>(`${ABSENCES_LIST_ENDPOINT}?searchTerm=${searchTerm}`, {headers: this.httpHeaders}).pipe(map((data: AbsenceItem[]) => this.mapListData(data)));
  }

  getAbsenceDefinitionList(): Observable<AbsenceDefinitionItem[]> {
    return this.http.get<AbsenceDefinitionItem[]>(ABSENCES_DEFINITION_LIST_ENDPOINT, {headers: this.httpHeaders});
  }

  createAbsence(toSave: AbsenceCreateItem): Observable<any> {
    return this.http.post(ABSENCES_LIST_ENDPOINT, toSave, {headers: this.httpHeaders});
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
