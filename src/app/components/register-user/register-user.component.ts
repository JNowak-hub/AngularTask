import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../models/UserModel';
import {RegisteryService} from '../../services/registration/registery.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  password: string;
  email: string;
  passwordIsValid = true;
  emailIsValid = true;

  constructor(private registeryService: RegisteryService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.validateForm()) {
      const newUser: UserModel = {
        email: this.email,
        password: this.password
      };
      this.registeryService.createNewUser(newUser);
    }
  }

  validateForm(): boolean {
    if (!this.validatePassword(this.password) || !this.validateEmail(this.email)) {
      if (!this.validatePassword(this.password)) {
        this.passwordIsValid = false;
      } else {
        this.passwordIsValid = true;
      }
      if (!this.validateEmail(this.email)) {
        this.emailIsValid = false;
      } else {
        this.emailIsValid = true;
      }
      return false;
    }
    return true;
  }

  private validatePassword(password: string): boolean {
    if (typeof password !== 'undefined') {
      for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) === ' ') {
          alert('Password cannot consists white characters');
          return false;
        }
      }
      if (password.length > 8) {
        return true;
      }
    }
    alert('Password is to short must have at least 8 characters');
    return false;
  }

  private validateEmail(email: string): boolean {
    if (typeof email === 'undefined') {
      alert('Wrong email address');
      return false;
    }
    const re = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (email.search(re) === -1) {
      alert('Wrong email address');
      return false;
    }
    return true;
  }

}
