import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ClockComponent} from '../clock/clock.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, ClockComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have clock', () => {
    const clockComponent = de.query(By.css('app-clock')).nativeElement;
    expect(clockComponent).toBeTruthy();
  });

  it('should have divs', () => {
    const divs = de.queryAll(By.css('div'));
    expect(divs[1].nativeElement.innerText).toBeTruthy();
    expect(divs[2].nativeElement.innerText).toBe('Home');
    expect(divs[3].nativeElement.innerText).toBe('Administration Panel');
    expect(divs[4].nativeElement.innerText).toBe('Register');
    expect(divs[5].nativeElement.innerText).toBe('Login');
  });
});
