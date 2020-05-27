import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClientHomeComponent } from "./client-home/client-home.component";
import { ClientWeatherModule } from "./client-weather/client-weather.module";

@NgModule({
  declarations: [AppComponent, ClientHomeComponent],
  imports: [BrowserModule, AppRoutingModule, ClientWeatherModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
