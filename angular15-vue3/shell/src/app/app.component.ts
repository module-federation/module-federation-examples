import { Component } from '@angular/core';
import { MicrofrontendService } from './microfrontends/microfrontend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
  constructor(public mfService: MicrofrontendService) {}
}
