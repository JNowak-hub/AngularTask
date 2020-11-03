import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have h1', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Niesamowita apka administracyjna!');
  });

  it('should have h5', () => {
    expect(de.query(By.css('h5')).nativeElement.innerText).toBe('Już dziś zarejestruj się i uzyskaj dostęp do niesamowitych treści i materiałów!');
  });
});
