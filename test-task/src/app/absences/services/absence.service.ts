import { Injectable } from '@angular/core';
import { AbsencesModule } from '../absences.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ABSENCES_LIST_ENDPOINT } from '../../utils/constants/endpoints/absences/constants';
import { AbsenceListItem } from '../../store/models/absence.model';

@Injectable({
  providedIn: AbsencesModule
})
export class AbsenceService {
  httpHeaders!: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${this.authService.getToken()}`,
    });
  }

  searchAbsenceList(searchTerm: string | Date): Observable<AbsenceListItem[]> {
    return this.http.get(`${ABSENCES_LIST_ENDPOINT}?dateFrom=${searchTerm}`, {headers: this.httpHeaders}).pipe(map((data: Object | AbsenceListItem[]) => this.mapListData(data)));
  }

  private mapListData(data: any): AbsenceListItem[] {
    if (data) {
      return data.map((item: AbsenceListItem) => {
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
