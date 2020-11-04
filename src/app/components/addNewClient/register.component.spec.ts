import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RegisteryService} from '../../services/registration/registery.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SubcategoryselectComponent} from '../subcategoryselect/subcategoryselect.component';
import {Media} from '../../models/industry/subcategories/Media';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let registerService: RegisteryService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent, SubcategoryselectComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        {provide: RegisteryService, useValue: {createNewUser: () => {}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
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

  it('should have input with email', () => {
    expect(de.query(By.css('input[name="email"]'))).toBeTruthy();
  });

  it('should have input with name', () => {
    expect(de.query(By.css('input[name="fname"]'))).toBeTruthy();
  });

  it('should have input with last name', () => {
    expect(de.query(By.css('input[name="lname"]'))).toBeTruthy();
  });

  it('should have input with birth date', () => {
    expect(de.query(By.css('input[name="birthDate"]'))).toBeTruthy();
  });

  it('should have input with phone number', () => {
    expect(de.query(By.css('input[name="phoneNumber"]'))).toBeTruthy();
  });

  it('should have select with industries', () => {
    expect(de.query(By.css('select[name="industrySelect"]'))).toBeTruthy();
  });

  it('should have options (Media, Finances, Travel) in select', () => {
    const options = de.queryAll(By.css('select[name="industrySelect"] > option'));
    expect(options[0].nativeElement.innerText).toBe('Media');
    expect(options[1].nativeElement.innerText).toBe('Travel');
    expect(options[2].nativeElement.innerText).toBe('Finances');
  });

  it('when selected industry field updated', () => {
    const select = de.query(By.css('select[name="industrySelect"]')).nativeElement;
    select.value = select.options[0].value;  // <-- select a new value
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.selectedIndustry.name).toBe('Media');
    });
  });

  it('when email incorrect return false on validation', () => {
    component.email = 'badEmailFormat';
    expect(component.isFormValid()).toBeFalse();
  });

  it('when name incorrect return false on validation', () => {
    component.name = '';
    expect(component.isFormValid()).toBeFalse();
  });

  it('when last name incorrect return false on validation', () => {
    component.lastName = '  ';
    expect(component.isFormValid()).toBeFalse();
  });

  it('when birth date incorrect return false on validation', () => {
    component.birthDate = new Date().toTimeString();
    expect(component.isFormValid()).toBeFalse();
  });

  it('when phone number incorrect return false on validation', () => {
    component.telephoneNumber = 233333333333333;
    expect(component.isFormValid()).toBeFalse();
  });

  it('when submit button clicked onSubmit called', () =>{
    spyOn(component, 'onSubmit');
    const submit = de.query(By.css('input[type="submit"]')).nativeElement;
    submit.click();

    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
    });
  });

  it('when submit button clicked validation called', () => {
    spyOn(component, 'onSubmit');
    const submit = de.query(By.css('input[type="submit"]')).nativeElement;
    submit.click();

    fixture.whenStable().then(() => {
      expect(component.isFormValid).toHaveBeenCalled();
    });
  });

  it('when form valid validation return true', () => {
    component.email = 'email@email.com';
    component.name = 'name';
    component.lastName = 'lastname';
    component.birthDate = '01-01-1900';
    component.selectedIndustry = new Media();
    component.selectedSubcategory = 'Tv';
    component.telephoneNumber = 123123123;
    expect(component.isFormValid).toBeTruthy();
  });

  it('should have labels', () => {
    const labels = de.queryAll(By.css('label'));
    expect(labels[0].nativeElement.innerText).toBe('Insert email address');
    expect(labels[1].nativeElement.innerText).toBe('Insert name');
    expect(labels[2].nativeElement.innerText).toBe('Insert last name');
    expect(labels[3].nativeElement.innerText).toBe('Enter birth date');
    expect(labels[4].nativeElement.innerText).toBe('Select industry');
    expect(labels[5].nativeElement.innerText).toBe('Select industry subcategory');
    expect(labels[6].nativeElement.innerText).toBe('Enter phone number');
  });
});
