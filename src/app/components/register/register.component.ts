import {Component, OnInit} from '@angular/core';
import {Media} from '../models/industry/media/Media';
import {Travel} from '../models/industry/travel/Travel';
import {Finances} from '../models/industry/finances/Finances';
import {Industry} from '../models/industry/Industry';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/UserModel';
import {TokenModel} from '../models/industry/TokenModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  httpClient: HttpClient;

  email: string;
  name: string;
  lastName: string;
  birthDate: string;
  selectedIndustry: Industry = new Media();
  selectedSubcategory = '';
  telephoneNumber: number;
  password: string;

  passwordIsValid = true;
  emailIsValid = true;
  birthdayIsValid = true;
  telephoneNumberIsValid = true;
  nameIsValid = true;
  lastNameIsValid = true;
  industries = [new Media(), new Travel(), new Finances()];

  constructor(httpClient: HttpClient, private router: Router) {
    this.httpClient = httpClient;
  }

  ngOnInit(): void {
    console.log(this.industries);
  }

  logEmit(value: string): void {
    this.selectedSubcategory = value;
    console.log(this.selectedSubcategory);
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const newUser: UserModel = {
        email: this.email,
        password: this.password,
        clientInfo: {
          firstName: this.name,
          lastName: this.lastName,
          birthDay: this.birthDate,
          industry: this.selectedIndustry.name,
          subCategory: this.selectedSubcategory,
          telephoneNumber: this.telephoneNumber
        }
      };
      this.httpClient.post<TokenModel>('http://localhost:3000/register', newUser)
        .subscribe(token => {
          localStorage.setItem('token', token.accessToken);
        });
      this.router.navigate(['/controlPanel']);
    }
  }

  private isFormValid(): boolean {
    if (!this.validatePhoneNumber(this.telephoneNumber) || !this.validateAge(this.birthDate)
      || !this.validateEmail(this.email) || !this.validatePassword(this.password) ||
      !this.validNameOrLastName(this.name) || !this.validNameOrLastName(this.lastName)) {
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
      if (!this.validateAge(this.birthDate)) {
        this.birthdayIsValid = false;
      } else {
        this.birthdayIsValid = true;
      }
      if (!this.validatePhoneNumber(this.telephoneNumber)) {
        this.telephoneNumberIsValid = false;
      } else {
        this.telephoneNumberIsValid = true;
      }
      if (!this.validNameOrLastName(this.name)) {
        this.nameIsValid = false;
      } else {
        this.nameIsValid = true;
      }
      if (!this.validNameOrLastName(this.lastName)) {
        this.lastNameIsValid = false;
      } else {
        this.lastNameIsValid = true;
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

  private validateAge(birthday: string): boolean {
    const timeDiff = new Date().getTime() - Date.parse(birthday);
    const age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
    if (age >= 18) {
      return true;
    }
    alert('This side is for 18+ only');
    return false;
  }

  private validNameOrLastName(name: string): boolean {
    if (typeof name === 'undefined' || (name.trim()).length === 0) {
      return false;
    }
    return true;
  }

  private validatePhoneNumber(telephoneNumber: number): boolean {
    if (typeof telephoneNumber === 'undefined') {
      return false;
    }
    const reg = new RegExp('^\\d{9}$');
    const stringNumber = telephoneNumber.toString();
    for (let i = 0; i < stringNumber.length; i++) {
      if (stringNumber.charAt(i) === ' ') {
        alert('phone number cannot consists white characters');
        return false;
      }
    }
    if (stringNumber.search(reg) !== -1 && stringNumber.charAt(0) !== '0') {
      return true;
    }
    alert('Wrong phone number format');
    return false;
  }
}
