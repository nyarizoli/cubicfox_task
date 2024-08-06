import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../utils/constants/keys/authentication/authentication.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  storeToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
}
