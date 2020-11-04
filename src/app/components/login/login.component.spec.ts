import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {RegisteryService} from '../../services/registration/registery.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserModel} from '../../models/UserModel';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let registerService;
  let de: DebugElement;

  beforeEach(async () => {
    registerService = jasmine.createSpyObj(['login']);
    registerService.login.and.returnValue();
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provider: RegisteryService, useValue: registerService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    registerService = TestBed.get(RegisteryService);
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have labels', () => {
    const labels = de.queryAll(By.css('label'));
    expect(labels[0].nativeElement.innerText).toBe('Insert email');
    expect(labels[1].nativeElement.innerText).toBe('Insert password');
  });

  it('should have email input', () => {
    const input = de.queryAll(By.css('input[name="email"]'));
    expect(input).toBeTruthy();
  });

  it('should have password input', () => {
    const input = de.queryAll(By.css('input[name="password"]'));
    expect(input).toBeTruthy();
  });

  });
