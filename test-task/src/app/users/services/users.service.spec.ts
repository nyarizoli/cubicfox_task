import { inject, TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserItem } from '../../store/models/user.model';
import { AbsenceCreateItem, AbsenceDefinitionItem } from '../../store/models/absence.model';

// Here the same string to constants sentence also could be true
// Also each function test could be separated to different describe sections and make more cases to each function like for in case of error response and etc.

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UsersService
      ],
      imports: []
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it(
    'getUserList should return a list of users',
    inject(
      [HttpTestingController, UsersService],
      (httpMock: HttpTestingController, usersService: UsersService) => {
        const mockResponse: UserItem[] =
          [
            {
              FirstName: 'Test',
              LastName: 'Elek',
              Email: 'test@elek.com',
              FullName: 'Test Elek'
            }
          ]

          usersService.getUserList().subscribe((event: any) => {
            expect(event.length).toEqual(1);
            expect(event[0].LastName).toEqual('Elek');
        });

        const mockReq = httpMock.expectOne('https://api4.allhours.com/api/v1/Users');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      }
    )
  );

  it(
    'searchUserList should return a list of users by search term',
    inject(
      [HttpTestingController, UsersService],
      (httpMock: HttpTestingController, usersService: UsersService) => {
        const mockResponse: UserItem[] =
          [
            {
              FirstName: 'test',
              LastName: 'name',
              Email: 'test@name.com',
              FullName: 'Test Name'
            }
          ]

          usersService.searchUserList('test name').subscribe((event: any) => {
            expect(event.length).toEqual(1);
            expect(event[0].LastName).toEqual('name');
            expect(event[0].FirstName).toEqual('test');
        });

        const mockReq = httpMock.expectOne('https://api4.allhours.com/api/v1/Users/Query?searchTerm=test name');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      }
    )
  );

  it(
    'addUser should create a new user',
    inject(
      [HttpTestingController, UsersService],
      (httpMock: HttpTestingController, usersService: UsersService) => {
        const mockResponse: UserItem =
            {
              FirstName: 'test',
              LastName: 'name',
              Email: 'test@name.com',
              FullName: 'Test Name'
            }

          usersService.addUser(mockResponse).subscribe((event: any) => {
            expect(event.LastName).toEqual('name');
            expect(event.FirstName).toEqual('test');
        });

        const mockReq = httpMock.expectOne('https://api4.allhours.com/api/v1/Users');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      }
    )
  );

  it(
    'getUserAbsenceList should get absences for the user',
    inject(
      [HttpTestingController, UsersService],
      (httpMock: HttpTestingController, usersService: UsersService) => {
        const mockItems = [
          {
            AbsenceDefinitionName: 'test',
            Timestamp: '2022-03-17T16:35:28.5939628',
            InsertedOn: '2022-03-17T16:35:28.5939628',
            FirstName: "Test",
            LastName: "Elek"
          }
        ];

        usersService.getUserAbsenceList('Test Elek').subscribe((event: any) => {
            expect(event.length).toEqual(mockItems.length);
        });

        const mockReq = httpMock.expectOne('https://api4.allhours.com/api/v1/Absences?searchTerm=Test Elek');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockItems);

        httpMock.verify();
      }
    )
  );

  it(
    'getUserAbsenceList should map the dates',
    inject(
      [HttpTestingController, UsersService],
      (httpMock: HttpTestingController, usersService: UsersService) => {
        const mockItems = [
          {
            AbsenceDefinitionName: 'test',
            Timestamp: '2022-03-17T16:35:28.5939628',
            InsertedOn: '2022-03-17T16:35:28.5939628',
            FirstName: "Test",
            LastName: "Elek"
          }
        ];

        usersService.getUserAbsenceList('Test Elek').subscribe((event: any) => {
          expect(event[0].Timestamp).toEqual('2022. 03. 17. 16:35:28');
          expect(event[0].InsertedOn).toEqual('2022. 03. 17. 16:35:28');
        });

        const mockReq = httpMock.expectOne('https://api4.allhours.com/api/v1/Absences?searchTerm=Test Elek');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockItems);

        httpMock.verify();
      }
    )
  );

  it(
    'getAbsenceDefinitionList should get a list of definitions',
    inject(
      [HttpTestingController, UsersService],
      (httpMock: HttpTestingController, usersService: UsersService) => {
        const mockResponse: AbsenceDefinitionItem[] =
            [
              {
                CategoryDefinitionId: '1',
                CategoryDefinitionName: 'Test Cat',
                Name: 'Test Cat',
                Id: '01'
              }
            ]

          usersService.getAbsenceDefinitionList().subscribe((event: any) => {
            expect(event.length).toEqual(1);
            expect(event[0].Name).toEqual('Test Cat');
        });

        const mockReq = httpMock.expectOne('https://api4.allhours.com/api/v1/AbsenceDefinitions');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      }
    )
  );

  it(
    'createAbsence should create a new absence',
    inject(
      [HttpTestingController, UsersService],
      (httpMock: HttpTestingController, usersService: UsersService) => {
        const mockResponse: AbsenceCreateItem =
            {
              UserId: '1',
              Timestamp: '2022-03-17T16:35:28.5939628',
              AbsenceDefinitionId: '1',
              Origin: 0,
              Comment: 'Comment',
              PartialTimeFrom: '2022-03-17T16:35:28.5939628',
              PartialTimeTo: '2022-03-17T16:35:28.5939628',
              PartialTimeDuration: 0,
              IsPartial: false,
              OverrideHolidayAbsence: false
            }

          usersService.createAbsence(mockResponse).subscribe((event: any) => {
            expect(event.UserId).toEqual('1');
        });

        const mockReq = httpMock.expectOne('https://api4.allhours.com/api/v1/Absences');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      }
    )
  );
});
