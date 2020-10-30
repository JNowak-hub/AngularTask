import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  time = new Date();

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  writePrettieTime(): string{
    let hour: string = this.time.getHours().toString();
    if (hour.length === 1){
      hour = '0' + hour;
    }
    let minutes: string = this.time.getMinutes().toString();
    if (minutes.length === 1){
      minutes = '0' + minutes;
    }
    let seconds: string = this.time.getSeconds().toString();
    if (seconds.length === 1){
      seconds = '0' + seconds;
    }
    return hour + ':' + minutes + ':' + seconds;
  }

}
