import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-weather-city',
  templateUrl: './client-weather-city.component.html',
  styleUrls: ['./client-weather-city.component.scss']
})
export class ClientWeatherCityComponent implements OnInit {

  @Input()
  public city: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
