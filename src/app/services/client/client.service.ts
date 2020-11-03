import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ClientModel} from '../../models/ClientModel';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients: ClientModel[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  getClients(): ClientModel[] {
    this.getClientsFromApi();
    return this.clients;
  }
  deleteClient(client: ClientModel, clientsList: ClientModel[]): void{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    this.httpClient.delete('http://localhost:3000/660/clients/' + client.id, httpOptions);
    clientsList.splice(client.id - 1, 1);
  }
  createNewClient(newClient: ClientModel): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    this.httpClient.post<ClientModel>('http://localhost:3000/660/clients', newClient, httpOptions)
      .subscribe(client => {
        console.log(client);
      });
  }

  private  getClientsFromApi(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    this.httpClient.get<ClientModel[]>(`http://localhost:3000/660/clients`, httpOptions)
      .pipe(
        catchError(err => {
          if (err.status === 401){
            alert('Log in before get to the administaration panel');
            this.router.navigate(['/login']);
            return [];
          }else {
            alert('Some think went wrong try again');
            this.router.navigate(['']);
            return [];
          }
        })
      )
      .subscribe(res => {
        this.clients = res;
      });
  }
}
