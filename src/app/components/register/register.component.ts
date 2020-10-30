import {Component, OnInit} from '@angular/core';
import {Media} from '../models/industry/media/Media';
import {Travel} from '../models/industry/travel/Travel';
import {Finances} from '../models/industry/finances/Finances';
import {Industry} from '../models/industry/Industry';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  name: string;
  lastName: string;
  birthDate: string;
  selectedIndustry: Industry = new Media();
  selectedSubcategory = '';
  telephoneNumber: number;
  password: string;

  industries = [new Media(), new Travel(), new Finances()];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.industries);
  }

  logEmit(value: string): void {
    this.selectedSubcategory = value;
    console.log(this.selectedSubcategory);
  }

  onSubmit(): void {
    this.validatePassword(this.password);
    this.validateEmail(this.email);
    this.validateAge(this.birthDate);
    this.validatePhoneNumber(this.telephoneNumber);
    console.log(this.selectedSubcategory);
    console.log(this.selectedIndustry);
    console.log(this.lastName);
    console.log(this.name);
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
    if (typeof email === 'undefined'){
      alert('Wrong email address');
      return false;
    }
    const re = new RegExp( /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (email.search(re) === -1){
      alert('Wrong email address');
      return false;
    }
    return false;
  }

  private validateAge(birthday: string): boolean {
    const timeDiff = new Date().getTime() - Date.parse(birthday);
    const age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
    if (age >= 18){
      return true;
    }
    alert('This side is for 18+ only');
    return false;
  }

  private validatePhoneNumber(telephoneNumber: number): boolean {
    const reg = new RegExp('^\\d{9}$');
    const stringNumber = telephoneNumber.toString();
    for (let i = 0; i < stringNumber.length; i++) {
      if (stringNumber.charAt(i) === ' ') {
        alert('phone number cannot consists white characters');
        return false;
      }
    }
    if (stringNumber.search(reg) !== -1 && stringNumber.charAt(0) !== '0'){
      return true;
    }
    alert('Wrong phone number format');
    return false;
  }
}
