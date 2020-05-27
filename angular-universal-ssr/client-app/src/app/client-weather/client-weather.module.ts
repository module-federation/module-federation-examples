import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClientWeatherHomeComponent } from "./client-weather-home/client-weather-home.component";
import { ClientWeatherRoutingModule } from "./client-weather-routing.module";

@NgModule({
  declarations: [ClientWeatherHomeComponent],
  imports: [CommonModule, ClientWeatherRoutingModule],
  exports: [ClientWeatherHomeComponent],
})
export class ClientWeatherModule {}
