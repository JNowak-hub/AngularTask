import {Component, OnInit} from '@angular/core';
import {ClientModel} from '../../models/ClientModel';
import {Industry} from '../../models/industry/Industry';
import {Media} from '../../models/industry/subcategories/Media';
import {Travel} from '../../models/industry/subcategories/Travel';
import {Finances} from '../../models/industry/subcategories/Finances';
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
  p = 1;

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientService.getClientsFromApi().subscribe(res => this.clients = res);
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
    if (typeof this.selectedIndustry !== 'undefined') {
      return true;
    }
    return false;
  }

  deleteClient(client: ClientModel): void {
    this.clientService.deleteClient(client, this.clients).subscribe();
    this.ngOnInit();
  }
}
