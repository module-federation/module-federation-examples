import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { UserState } from '../../../mdmf-shared/src/lib/app-state/state/user.state';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxsModule.forRoot([UserState])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
