import { Injectable } from '@angular/core';
import { UsersModule } from '../users.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_LIST_ENDPOINT, USER_LIST_SEARCH_ENDPOINT } from '../../utils/constants/endpoints/users/constants';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: UsersModule
})
export class UsersService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserList(): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get(USER_LIST_ENDPOINT, {headers: httpHeaders});
  }

  searchUserList(searchTerm: string): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get(`${USER_LIST_SEARCH_ENDPOINT}?searchTerm=${searchTerm}`, {headers: httpHeaders});
  }
}
