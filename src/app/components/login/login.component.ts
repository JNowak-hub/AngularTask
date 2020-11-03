import {Component, OnInit} from '@angular/core';
import {UserModel} from '../models/UserModel';
import {RegisteryService} from '../../services/registration/registery.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string;
  email: string;
  passwordIsValid = true;
  emailIsValid = true;

  constructor(private registeryService: RegisteryService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const user: UserModel = {
      email: this.email,
      password: this.password
    };
    this.registeryService.login(user);
  }

}
