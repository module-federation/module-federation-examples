import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { MicrofrontendService } from './microfrontends/microfrontend.service';
import { MdmfSharedModule } from 'projects/mdmf-shared/src/lib/modules/mdmf-shared.module';
import { NgxsModule } from '@ngxs/store';
import { UserState } from 'projects/mdmf-shared/src/lib/app-state/state/user.state';

export function initializeApp(mfService: MicrofrontendService): () => Promise<void> {
  return () => mfService.initialise();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    NgxsModule.forRoot([UserState]),
    MdmfSharedModule,
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
