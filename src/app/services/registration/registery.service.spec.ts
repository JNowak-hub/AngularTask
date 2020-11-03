import { TestBed } from '@angular/core/testing';

import { RegisteryService } from './registery.service';

describe('RegisteryService', () => {
  let service: RegisteryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
