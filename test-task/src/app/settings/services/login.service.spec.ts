import { inject, TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

// Here the same string to constants sentence also could be true

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        LoginService
      ],
      imports: []
    });
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it(
    'should get token',
    inject(
      [HttpTestingController, LoginService],
      (httpMock: HttpTestingController, loginService: LoginService) => {
        const mockResponse =
          {
            access_token: 'test_token'
          }

          const mockCreds = {
            client_id: 'test_id',
            client_secret: 'test_secret'
          }

          loginService.login(mockCreds).subscribe((event: any) => {
            expect(event.access_token).toEqual('test_token');
        });

        const mockReq = httpMock.expectOne('/connect/token');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      }
    )
  );
});

