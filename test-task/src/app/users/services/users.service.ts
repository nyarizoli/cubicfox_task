import { Injectable } from '@angular/core';
import { UsersModule } from '../users.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_LIST_ENDPOINT, USER_LIST_SEARCH_ENDPOINT } from '../../utils/constants/endpoints/users/constants';
import { AuthService } from '../../services/auth.service';
import { UserCreate } from '../../store/models/user.model';

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

  getUserList(): Observable<any> {
    return this.http.get(USER_LIST_ENDPOINT, {headers: this.httpHeaders});
  }

  searchUserList(searchTerm: string): Observable<any> {
    return this.http.get(`${USER_LIST_SEARCH_ENDPOINT}?searchTerm=${searchTerm}`, {headers: this.httpHeaders});
  }

  addUser(userToAdd: UserCreate): Observable<any> {
    return this.http.post(USER_LIST_ENDPOINT, userToAdd, {headers: this.httpHeaders});
  }
}
