import {getTestBed, TestBed} from '@angular/core/testing';

import {ClientService} from './client.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ClientModel} from '../../models/ClientModel';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginComponent} from '../../components/login/login.component';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [
          {path: 'login', component: LoginComponent}
        ]
      )]
    });
    service = TestBed.inject(ClientService);
    httpMock = getTestBed().get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('#getUsers', () => {
    it('should get users ', () => {
      const dummyClients: ClientModel[] = [
        {
          id: 1, email: 'email@email.com', clientInfo: {
            firstName: 'adam',
            lastName: 'kowalczyk',
            telephoneNumber: 123123123,
            birthDay: '10-10-2000',
            industry: 'Media',
            subCategory: 'Tv'
          }
        },
        {
          id: 2, email: 'email@email.com', clientInfo: {
            firstName: 'mateusz',
            lastName: 'nowak',
            telephoneNumber: 321321321,
            birthDay: '01-01-1900',
            industry: 'Media',
            subCategory: 'Tv'
          }
        }
      ];

      service.getClientsFromApi().subscribe(clients => {
        expect(clients.length).toBe(2);
        expect(clients).toBe(dummyClients);
      });

      const req = httpMock.expectOne(`http://localhost:3000/660/clients`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyClients);
    });

    it('should throw an error if trying to get clients with no token', () => {
      const errorMessage = 'Bad credentials';
      service.getClientsFromApi()
        .subscribe((data: ClientModel[]) => fail('fail with 401'), (err: HttpErrorResponse) => {
          expect(err.status).toEqual(401);
          expect(err.error).toEqual(errorMessage);
        });

      const reg = httpMock.expectOne(`http://localhost:3000/660/clients`);
      expect(reg.request.method).toBe('GET');
      reg.flush(errorMessage, {status: 401, statusText: 'Bad credentials'});
    });
  });

  describe('#createUser', () => {

    it('should post user ', () => {

      const dummyClient: ClientModel = {
        id: 1, email: 'email@email.com', clientInfo: {
          firstName: 'adam',
          lastName: 'kowalczyk',
          telephoneNumber: 123123123,
          birthDay: '10-10-2000',
          industry: 'Media',
          subCategory: 'Tv'
        }
      };
      service.createNewClient(dummyClient).subscribe(client => {
        expect(client.id).toBe(1);
        expect(client.email).toBe('email@email.com');
      });

      const req = httpMock.expectOne(`http://localhost:3000/660/clients`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyClient);
    });
  });
  describe('#deleteClient', () => {
    it('should delete user ', () => {

      const dummyClient: ClientModel = {
        id: 1, email: 'email@email.com', clientInfo: {
          firstName: 'adam',
          lastName: 'kowalczyk',
          telephoneNumber: 123123123,
          birthDay: '10-10-2000',
          industry: 'Media',
          subCategory: 'Tv'
        }
      };

      const dummyClients: ClientModel[] = [
        {
          id: 1, email: 'email@email.com', clientInfo: {
            firstName: 'adam',
            lastName: 'kowalczyk',
            telephoneNumber: 123123123,
            birthDay: '10-10-2000',
            industry: 'Media',
            subCategory: 'Tv'
          }
        },
        {
          id: 2, email: 'email@email.com', clientInfo: {
            firstName: 'mateusz',
            lastName: 'nowak',
            telephoneNumber: 321321321,
            birthDay: '01-01-1900',
            industry: 'Media',
            subCategory: 'Tv'
          }
        }
      ];


      service.deleteClient(dummyClient, dummyClients).subscribe(res => {
        expect(res.length).toBe(0);
      });

      const req = httpMock.expectOne('http://localhost:3000/660/clients/' + dummyClient.id);
      expect(req.request.method).toBe('DELETE');
      req.flush([]);
      expect(dummyClients.length).toBe(1);
    });
  });
});
