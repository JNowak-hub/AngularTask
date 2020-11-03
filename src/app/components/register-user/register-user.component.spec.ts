import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';
import {RegisteryService} from '../../services/registration/registery.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserModel} from '../../models/UserModel';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let registerService: RegisteryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterUserComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provider: RegisteryService, useValue: {
          createNewUser: (newUser: UserModel) => {}
        }
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    registerService = TestBed.get(RegisteryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
