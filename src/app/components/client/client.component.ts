import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientModel} from '../models/ClientModel';
import {ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @Input() user: ClientModel;
  @Output() deleteUser: EventEmitter<ClientModel> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteClient(): void {
    this.deleteUser.emit(this.user);
  }

}
