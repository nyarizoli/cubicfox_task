import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

// Here the same string to constants sentence also could be true
// If I had enough time I also prefer to make Cypress functional tests too

describe('AuthService', () => {
  let service: AuthService;
  let localStore: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService
      ],
      imports: []
    });
    service = TestBed.inject(AuthService);

    localStore = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    spyOn(window.localStorage, 'removeItem').and.callFake(
      (key) => (localStore = {})
    );
  });

  it(
    'storeToken function should store tokens and getToken should return the stored token',
    inject(
      [AuthService],
      (authService: AuthService) => {
        authService.storeToken('test');
        expect(authService.getToken()).toEqual('test')
      }
    )
  );

  it(
    'removeToken function should remove tokens from localStorage and getToken should return null',
    inject(
      [AuthService],
      (authService: AuthService) => {
        authService.storeToken('test');
        expect(authService.getToken()).toEqual('test')
        authService.removeToken();
        expect(authService.getToken()).toEqual(null);
      }
    )
  );

  it(
    'isLoggedIn function should return true if token already stored in the local storage',
    inject(
      [AuthService],
      (authService: AuthService) => {
        authService.storeToken('test');
        expect(authService.getToken()).toEqual('test')
        expect(authService.isLoggedIn()).toEqual(true);
      }
    )
  );

  it(
    'isLoggedIn function should return false if there is no token stored in the local storage',
    inject(
      [AuthService],
      (authService: AuthService) => {
        authService.storeToken('test');
        expect(authService.getToken()).toEqual('test')
        expect(authService.isLoggedIn()).toEqual(true);
        authService.removeToken();
        expect(authService.isLoggedIn()).toEqual(false);
      }
    )
  );
});

