import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-city',
  templateUrl: './client-city.component.html',
  styleUrls: ['./client-city.component.scss'],
})
export class ClientCityComponent implements OnInit {
  @Input()
  public city: string;

  constructor() {}

  ngOnInit(): void {}
}
