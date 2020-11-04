import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';
import {RegisteryService} from '../../services/registration/registery.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserModel} from '../../models/UserModel';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let registerService: RegisteryService;
  let de: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterUserComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provider: RegisteryService, useValue: registerService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
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

  it('should have input for email', () => {
    const input = de.query(By.css('input[name="email"]')).nativeElement;
    expect(input).toBeTruthy();
  });

  it('should have input for password', () => {
    const input = de.query(By.css('input[name="password"]')).nativeElement;
    expect(input).toBeTruthy();
  });

  it('should have input submit', () => {
    const input = de.query(By.css('input[type="submit"]')).nativeElement;
    expect(input).toBeTruthy();
  });

  it('validation should return false on bad password', () => {
    component.password = '123';
    component.validateForm();
    expect(component.passwordIsValid).toBeFalse();
  });

  it('validation should return true on correct password', () => {
    component.password = '123123123';
    component.validateForm();
    expect(component.passwordIsValid).toBeTrue();
  });

  it('validation should return false on bad email address', () => {
    component.email = '123123123';
    component.validateForm();
    expect(component.emailIsValid).toBeFalse();
  });
  it('validation should return false on bad email address', () => {
    component.email = 'email@email';
    component.validateForm();
    expect(component.emailIsValid).toBeFalse();
  });
  it('validation should return false on bad email address', () => {
    component.email = '@email.com';
    component.validateForm();
    expect(component.emailIsValid).toBeFalse();
  });
  it('validation should return false on bad email address', () => {
    component.email = 'email.com';
    component.validateForm();
    expect(component.emailIsValid).toBeFalse();
  });
  it('validation should return true on correct email address', () => {
    component.email = 'email@email.com';
    component.validateForm();
    expect(component.emailIsValid).toBeTrue();
  });
});
