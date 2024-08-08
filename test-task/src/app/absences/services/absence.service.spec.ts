import { inject, TestBed } from '@angular/core/testing';

import { AbsenceService } from './absence.service';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

// When I was making tests I already been in a vacation, so I know that it could be more refactored and clean, eg. with the strings and the mock data could be organized in constants
// If I had enough time I also prefer to make Cypress functional tests too

describe('AbsenceService', () => {
  let service: AbsenceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AbsenceService
      ],
      imports: []
    });
    service = TestBed.inject(AbsenceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it(
    'should get users',
    inject(
      [HttpTestingController, AbsenceService],
      (httpMock: HttpTestingController, absenceService: AbsenceService) => {
        const mockItems = [
          {
            AbsenceDefinitionName: 'test',
            Timestamp: '2022-03-17T16:35:28.5939628',
            InsertedOn: '2022-03-17T16:35:28.5939628',
            FirstName: "Test",
            LastName: "Elek"
          }
        ];

        absenceService.searchAbsenceList('2022-03-17T16:35:28.5939628').subscribe((event: any) => {
            expect(event.length).toEqual(mockItems.length);
        });

        const mockReq = httpMock.expectOne('https://api4.allhours.com/api/v1/Absences?dateFrom=2022-03-17T16:35:28.5939628');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockItems);

        httpMock.verify();
      }
    )
  );

  it(
    'should map dates in users',
    inject(
      [HttpTestingController, AbsenceService],
      (httpMock: HttpTestingController, absenceService: AbsenceService) => {
        const mockItems = [
          {
            AbsenceDefinitionName: 'test',
            Timestamp: '2022-03-17T16:35:28.5939628',
            InsertedOn: '2022-03-17T16:35:28.5939628',
            FirstName: "Test",
            LastName: "Elek"
          }
        ];

        absenceService.searchAbsenceList('2022-03-17T16:35:28.5939628').subscribe((event: any) => {
            expect(event[0].Timestamp).toEqual('2022. 03. 17. 16:35:28');
        });

        const mockReq = httpMock.expectOne('https://api4.allhours.com/api/v1/Absences?dateFrom=2022-03-17T16:35:28.5939628');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockItems);

        httpMock.verify();
      }
    )
  );
});
