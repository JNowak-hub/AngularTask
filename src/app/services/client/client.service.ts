import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ClientModel} from '../../models/ClientModel';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  deleteClient(client: ClientModel, clientsList: ClientModel[]): Observable<[]>{
    console.log(client.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    clientsList.splice(client.id - 1, 1);
    return this.httpClient.delete('http://localhost:3000/660/clients/' + client.id, httpOptions) as Observable<[]>;
  }
  createNewClient(newClient: ClientModel): Observable<ClientModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.httpClient.post<ClientModel>('http://localhost:3000/660/clients', newClient, httpOptions) as Observable<ClientModel>;
  }

  getClientsFromApi(): Observable<ClientModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.httpClient.get<ClientModel[]>(`http://localhost:3000/660/clients`, httpOptions)
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
      ) as Observable<ClientModel[]>;
  }
}
