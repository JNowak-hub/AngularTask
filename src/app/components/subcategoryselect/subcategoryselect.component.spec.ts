import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryselectComponent } from './subcategoryselect.component';
import {Industry} from '../../models/industry/Industry';
import {Media} from '../../models/industry/subcategories/Media';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('SubcategoryselectComponent', () => {
  let component: SubcategoryselectComponent;
  let fixture: ComponentFixture<SubcategoryselectComponent>;
  let de: DebugElement;
  const industry: Industry = new Media();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryselectComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.selectedIndustry = industry;
    fixture.detectChanges();
    component.selectedIndustry = new Media();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 options', () => {
    const options = de.queryAll(By.css('option'));
    expect(options.length).toBe(2);
  });

  it('should have options TV and Radio', () => {
    fixture.whenStable().then(() => {
      const options = de.queryAll(By.css('option'));
      expect(options[0].nativeElement.innerText).toBe('TV');
      expect(options[1].nativeElement.innerText).toBe('Radio');
    });
  });

  it('should emit selected subcategory', () => {
    spyOn(component, 'emmitValue');
    component.selectedSubcategory = component.selectedIndustry.subcategory[0];
    const select = de.query(By.css('select')).nativeElement;
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.emmitValue).toHaveBeenCalled();
    });
  });
});
