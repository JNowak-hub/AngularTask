import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryselectComponent } from './subcategoryselect.component';
import {Industry} from '../../models/industry/Industry';
import {Media} from '../../models/industry/subcategories/Media';
import {DebugElement} from '@angular/core';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
