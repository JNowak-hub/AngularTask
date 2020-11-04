import {fakeAsync, getTestBed, TestBed} from '@angular/core/testing';

import { RegisteryService } from './registery.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserModel} from '../../models/UserModel';
import {TokenModel} from '../../models/TokenModel';
import {Router} from '@angular/router';
import {ControllPanelComponent} from '../../components/controll-panel/controll-panel.component';

describe('RegisteryService', () => {

  let service: RegisteryService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const token: TokenModel = {
    accessToken: 'token.token.token'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, RouterTestingModule.withRoutes([
        {path: 'controlPanel', component: ControllPanelComponent}
      ])]
    });
    injector = getTestBed();
    service = TestBed.inject(RegisteryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#createNewUser', () => {
    it('should insert token to localstorage', () => {
      const dummyUser: UserModel = {
        email: 'email@email.com',
        password: '123123123'
      };

      service.createNewUser(dummyUser);

      const req = httpMock.expectOne(`http://localhost:3000/register`);
      expect(req.request.method).toBe('POST');
      req.flush(token);
    });

    it('should call post method when create new user', () => {
      const user: UserModel = {
        email: 'user@user.com',
        password: '123123123'
      };
      service.createNewUser(user);
      const req = httpMock.expectOne(`http://localhost:3000/register`);
      req.flush(token);
      expect(req.request.body).toBe(user);
      expect(localStorage.getItem('token')).toBe(token.accessToken);
    });
  });

  describe('#login', () => {
    it('should insert token to localstorage', () => {
      const dummyUser: UserModel = {
        email: 'email@email.com',
        password: '123123123'
      };

      service.login(dummyUser);

      const req = httpMock.expectOne('http://localhost:3000/login');
      expect(req.request.method).toBe('POST');
      req.flush(token);
    });

    it('should call post method when login', () => {
      const user: UserModel = {
        email: 'user@user.com',
        password: '123123123'
      };
      service.login(user);
      const req = httpMock.expectOne(`http://localhost:3000/login`);
      req.flush(token);
      expect(req.request.body).toBe(user);
      expect(localStorage.getItem('token')).toBe(token.accessToken);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});

