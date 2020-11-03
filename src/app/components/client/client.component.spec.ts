import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientComponent } from './client.component';
import {DebugElement} from '@angular/core';
import {ClientModel} from '../../models/ClientModel';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let de: DebugElement;
  const client: ClientModel = {
    email: 'nowakjakub095@gmail.com',
    id: 2,
    clientInfo: {
      firstName: 'Jakub',
      lastName: 'Nowak',
      birthDay: '0001-11-11',
      industry: 'Media',
      subCategory: 'TV',
      telephoneNumber: 790257510
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.user = client;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
