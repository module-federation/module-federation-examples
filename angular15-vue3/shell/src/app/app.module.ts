import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { MicrofrontendService } from './microfrontends/microfrontend.service';
import { NgxsModule } from '@ngxs/store';

export function initializeApp(mfService: MicrofrontendService): () => Promise<void> {
  return () => mfService.initialise();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [
    MicrofrontendService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [MicrofrontendService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
