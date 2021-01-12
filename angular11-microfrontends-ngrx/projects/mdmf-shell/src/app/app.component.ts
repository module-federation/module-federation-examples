import { Component } from '@angular/core';
import { MicrofrontendService } from './microfrontends/microfrontend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mdmf-shell';
  constructor(public mfService: MicrofrontendService) {}
}
