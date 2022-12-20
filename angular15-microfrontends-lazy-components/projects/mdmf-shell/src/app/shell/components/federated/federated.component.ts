import {
  Component,
  Input,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ɵcreateInjector,
} from '@angular/core';
import { loadRemoteModule } from '../../../utils/federation-utils';

@Component({
  selector: 'federated-component',
  templateUrl: './federated.component.html',
  styleUrls: ['./federated.component.scss'],
})
export class FederatedComponent implements OnInit {
  @ViewChild('federatedComponent', { read: ViewContainerRef })
  federatedComponent: ViewContainerRef;
  @Input() remoteEntry: string;
  @Input() remoteName: string;
  @Input() exposedModule: string;
  @Input() componentName: string;

  constructor(private injector: Injector) {}
  ngOnInit(): void {
    loadRemoteModule({
      remoteEntry: this.remoteEntry,
      remoteName: this.remoteName,
      exposedModule: this.exposedModule,
    }).then(federated => {
      const { instance } = this.federatedComponent.createComponent(
        federated[this.exposedModule].exports.find(e => e.ɵcmp?.exportAs[0] === this.componentName),
        { injector: ɵcreateInjector(federated[this.exposedModule], this.injector) },
      );
    });
  }
}
