import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryselectComponent } from './subcategoryselect.component';

describe('SubcategoryselectComponent', () => {
  let component: SubcategoryselectComponent;
  let fixture: ComponentFixture<SubcategoryselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
