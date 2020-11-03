import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RegisteryService} from '../../services/registration/registery.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let registerService: RegisteryService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: RegisteryService, useValue: {createNewUser: () => {}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    registerService = TestBed.get(RegisteryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have from', () => {
    expect(de.query(By.css('form'))).toBeTruthy();
  });
});
