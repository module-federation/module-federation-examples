import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientCitiesModule } from './client-cities/client-cities.module';

@NgModule({
  declarations: [AppComponent, ClientHomeComponent],
  imports: [BrowserModule, AppRoutingModule, ClientCitiesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
