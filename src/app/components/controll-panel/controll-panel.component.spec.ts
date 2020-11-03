import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ControllPanelComponent} from './controll-panel.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ClientService} from '../../services/client/client.service';
import {of} from 'rxjs';

describe('ControllPanelComponent', () => {
  let component: ControllPanelComponent;
  let fixture: ComponentFixture<ControllPanelComponent>;
  let clientService: ClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllPanelComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provider: ClientService, useValue: {
            getClients: () => of([{
              email: 'nowakjakub095@gmail.com',
              id: 1,
              clientInfo: {
                firstName: 'Jakub',
                lastName: 'Nowak',
                birthDay: '0001-11-11',
                industry: 'Media',
                subCategory: 'TV',
                telephoneNumber: 790257510
              }
            },
              {
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
              }])
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllPanelComponent);
    component = fixture.componentInstance;
    clientService = TestBed.get(ClientService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
