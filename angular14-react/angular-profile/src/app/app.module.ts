import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { UserState } from './profile/user-state/state/user.state';
import { loadRemoteModule } from './utils/federation-utils';

export function initializeApp(): () => void {
  return () => {
    loadRemoteModule({
      remoteEntry: 'http://localhost:3002/remoteEntry.js',
      remoteName: 'list_user',
      exposedModule: './ListUserReactComponent',
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
