import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ControllPanelComponent} from './controll-panel.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ClientService} from '../../services/client/client.service';
import {DebugElement} from '@angular/core';
import {BrowserModule, By} from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

describe('ControllPanelComponent', () => {
  let component: ControllPanelComponent;
  let fixture: ComponentFixture<ControllPanelComponent>;
  let clientService: ClientService;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllPanelComponent],
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        BrowserModule],
      providers: [
        {provider: ClientService, useValue: clientService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllPanelComponent);
    component = fixture.componentInstance;
    clientService = TestBed.get(ClientService);
    de = fixture.debugElement;
    fixture.detectChanges();

    component.clients = [{
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
        email: 'kowal@interia.pl',
        id: 2,
        clientInfo: {
          firstName: 'Adam',
          lastName: 'Kowalczyk',
          birthDay: '0000-11-11',
          industry: 'Finances',
          subCategory: 'Bank',
          telephoneNumber: 123123123
        }
      }];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have button', () => {
    const button = de.query(By.css('button')).nativeElement;
    expect(button).toBeTruthy();
    expect(button.innerText).toBe('Add new Client');
  });

  it('should have search input', () => {
    const input = de.query(By.css('input')).nativeElement;
    expect(input).toBeTruthy();
  });

  it('should have label', () => {
    const label = de.query(By.css('label')).nativeElement;
    expect(label.innerText).toBe('Search');
  });

  it('should have table', () => {
    const table = de.query(By.css('table')).nativeElement;
    expect(table).toBeTruthy();
  });

  it('should have thead', () => {
    const theads = de.queryAll(By.css('th'));
    expect(theads[0].nativeElement.innerText).toBe('id');
    expect(theads[1].nativeElement.innerText).toBe('email');
    expect(theads[2].nativeElement.innerText).toBe('first name');
    expect(theads[3].nativeElement.innerText).toBe('last name');
    expect(theads[4].nativeElement.innerText).toBe('birth date');
    expect(theads[5].nativeElement.innerText).toBe('phone number');
    expect(theads[6].nativeElement.innerText).toBe('industry');
    expect(theads[7].nativeElement.innerText).toBe('subcategory');
    expect(theads[8].nativeElement.innerText).toBe('delete');
  });

  it('should have table data from service', () => {
    fixture.whenStable().then( () => {
      const td = de.queryAll(By.css('td'));
      expect(td[0].nativeElement.innerText).toBe(component.clients[0].id);
      expect(td[1].nativeElement.innerText).toBe(component.clients[0].email);
      expect(td[2].nativeElement.innerText).toBe(component.clients[0].clientInfo.firstName);
      expect(td[3].nativeElement.innerText).toBe(component.clients[0].clientInfo.lastName);
      expect(td[4].nativeElement.innerText).toBe(component.clients[0].clientInfo.birthDay);
      expect(td[5].nativeElement.innerText).toBe(component.clients[0].clientInfo.telephoneNumber);
      expect(td[6].nativeElement.innerText).toBe(component.clients[0].clientInfo.industry);
      expect(td[7].nativeElement.innerText).toBe(component.clients[0].clientInfo.subCategory);
      expect(td[8].nativeElement.innerText).toBe('Delete client');
    });
  });

  it('should search for adam', () => {
    component.searchString = 'Adam';
    fixture.whenStable().then(() => {
      const td = de.queryAll(By.css('td'));
      expect(td[0].nativeElement.innerText).toBe(component.clients[1].id);
      expect(td[1].nativeElement.innerText).toBe(component.clients[1].email);
      expect(td[2].nativeElement.innerText).toBe(component.clients[1].clientInfo.firstName);
      expect(td[3].nativeElement.innerText).toBe(component.clients[1].clientInfo.lastName);
      expect(td[4].nativeElement.innerText).toBe(component.clients[1].clientInfo.birthDay);
      expect(td[5].nativeElement.innerText).toBe(component.clients[1].clientInfo.telephoneNumber);
      expect(td[6].nativeElement.innerText).toBe(component.clients[1].clientInfo.industry);
      expect(td[7].nativeElement.innerText).toBe(component.clients[1].clientInfo.subCategory);
      expect(td[8].nativeElement.innerText).toBe('Delete client');
    });
  });

  it('should delete client when delete button clicked', () => {
    fixture.whenStable().then(() => {
      const tdButton = de.queryAll(By.css('td button'));
      tdButton[0].nativeElement.click();
      fixture.whenStable().then( () => {
        spyOn(component, 'deleteClient');
        expect(component.clients.length).toBe(1);
        expect(component.deleteClient).toHaveBeenCalled();
      });
    });
  });
});
