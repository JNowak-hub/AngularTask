import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ClientModel} from '../models/ClientModel';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Industry} from '../models/industry/Industry';
import {Media} from '../models/industry/media/Media';
import {Travel} from '../models/industry/travel/Travel';
import {Finances} from '../models/industry/finances/Finances';
import {ClientService} from '../../services/client/client.service';

@Component({
  selector: 'app-controll-panel',
  templateUrl: './controll-panel.component.html',
  styleUrls: ['./controll-panel.component.css']
})
export class ControllPanelComponent implements OnInit {

  clients: ClientModel[];
  searchString: string;
  industries: Industry[] = [new Media(), new Travel(), new Finances()];
  selectedIndustry: Industry;
  selectedSubcategory: string;

  constructor(private clientService: ClientService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    console.log(this.clients);
    this.clients = this.clientService.getClients();
  }

  logEmit(value: string): void {
    this.selectedSubcategory = value;
  }

  filterByIndustryAndCategory(selectedIndustry: Industry, selectedSubcategory: string): void {
    this.clients = this.clients.filter(res => {
      res.clientInfo.industry.match(selectedIndustry.name);
    });
  }

  isIndustrySelected(): boolean {
    if (typeof this.selectedIndustry !== 'undefined'){
      return true;
    }
    return false;
  }
}
