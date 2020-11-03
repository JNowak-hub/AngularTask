import { TestBed } from '@angular/core/testing';

import { RegisteryService } from './registery.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('RegisteryService', () => {
  let service: RegisteryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(RegisteryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
