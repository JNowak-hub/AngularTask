import {Component, OnInit} from '@angular/core';
import {Media} from '../../models/industry/subcategories/Media';
import {Travel} from '../../models/industry/subcategories/Travel';
import {Finances} from '../../models/industry/subcategories/Finances';
import {Industry} from '../../models/industry/Industry';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ClientModel} from '../../models/ClientModel';
import {TokenModel} from '../../models/TokenModel';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client/client.service';

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

  emailIsValid = true;
  birthdayIsValid = true;
  telephoneNumberIsValid = true;
  nameIsValid = true;
  lastNameIsValid = true;
  industries = [new Media(), new Travel(), new Finances()];

  constructor(private clientService: ClientService) {
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
      const newClient: ClientModel = {
        email: this.email,
        id: null,
        clientInfo: {
          firstName: this.name,
          lastName: this.lastName,
          birthDay: this.birthDate,
          industry: this.selectedIndustry.name,
          subCategory: this.selectedSubcategory,
          telephoneNumber: this.telephoneNumber
        }
      };
      this.clientService.createNewClient(newClient).subscribe(res => alert('created new client with id: ' + res.id));
      this.email = '';
      this.name = '';
      this.lastName = '';
      this.telephoneNumber = null;
      this.birthDate = null;
    }
  }

  private isFormValid(): boolean {
    if (!this.validatePhoneNumber(this.telephoneNumber) || !this.validateAge(this.birthDate)
      || !this.validateEmail(this.email) ||
      !this.validNameOrLastName(this.name) || !this.validNameOrLastName(this.lastName)) {
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
