import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

email: string;
name: string;
lastName: string;
birthDate: Date;
industry: string;
  constructor() { }

  ngOnInit(): void {
  }

}
