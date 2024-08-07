import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials, TokenResponse } from '../../store/models/login.model';
import { TOKEN_ENDPOINT } from '../../utils/constants/endpoints/auth/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(creds: LoginCredentials): Observable<TokenResponse> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization": "Basic " + btoa(creds.client_id + ':' + creds.client_secret),
      'scope': 'api'
    });
    return this.http.post<TokenResponse>(TOKEN_ENDPOINT, 'grant_type=client_credentials', {headers: httpHeaders});
  }
}
