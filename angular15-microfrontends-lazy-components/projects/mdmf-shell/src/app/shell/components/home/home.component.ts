import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  federatedLabel = 'Federated Label';
  counter = 0;
  constructor() {}
  ngOnInit(): void {}

  someEvent() {
    this.counter += 1;
    this.federatedLabel = 'Federated Label' + this.counter;
  }
}
