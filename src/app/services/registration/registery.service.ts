import { Injectable } from '@angular/core';
import {TokenModel} from '../../components/models/industry/TokenModel';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../components/models/UserModel';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisteryService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  createNewUser(newUser: UserModel): void{
    this.httpClient.post<TokenModel>('http://localhost:3000/register', newUser)
      .subscribe(token => {
        localStorage.setItem('token', token.accessToken);
        this.router.navigate(['/controlPanel']);
      });
  }

  login(user: UserModel): void {
    this.httpClient.post<TokenModel>('http://localhost:3000/login', user, {observe: 'response'})
      .subscribe(res => {
        if (res.status !== 200){
          alert('bad credentials');
        }else {
          localStorage.setItem('token', res.body.accessToken);
          this.router.navigate(['/controlPanel']);
        }
      });
  }
}
