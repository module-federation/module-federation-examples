import {
  Component,
  Input,
  OnInit,
  inject,
  ViewContainerRef,
} from '@angular/core';
import { loadRemoteModule } from '../../../utils/federation-utils';

@Component({
  selector: 'federated-component',
  templateUrl: './federated.component.html',
  styleUrls: ['./federated.component.scss'],
})
export class FederatedComponent implements OnInit {
  @Input() remoteEntry: string;
  @Input() remoteName: string;
  @Input() exposedModule: string;
  @Input() componentName = 'default';
  @Input() isApp: boolean;
  @Input() webComponentSelector: string;
  private viewContainerRef = inject(ViewContainerRef);

  ngOnInit(): void {
    loadRemoteModule({
      remoteEntry: this.remoteEntry,
      remoteName: this.remoteName,
      exposedModule: this.exposedModule,
    }).then(federated => {
      const entity = federated[this.componentName];
      if (this.isApp) {
        entity.mount(this.viewContainerRef.element.nativeElement);
      } else {
        const selector = this.webComponentSelector;
        if (!customElements.get(selector)) {
          customElements.define(selector, entity);
        }
        const element = document.createElement(selector);

        this.viewContainerRef.element.nativeElement.appendChild(element);
      }
    });
  }
}
