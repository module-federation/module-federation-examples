import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientWeatherCityComponent } from './client-weather-city/client-weather-city.component';
import { ClientWeatherHomeComponent } from './client-weather-home/client-weather-home.component';
import { ClientWeatherRoutingModule } from './client-weather-routing.module';


@NgModule({
    declarations: [
        ClientWeatherHomeComponent
    ],
    imports:      [
        CommonModule,
        ClientWeatherRoutingModule
    ],
    exports:      [
        ClientWeatherHomeComponent
    ]
})
export class ClientWeatherModule {
}
