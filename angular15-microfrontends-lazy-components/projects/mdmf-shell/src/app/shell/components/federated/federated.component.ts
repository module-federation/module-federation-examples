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
import { ListUserComponent } from '../list-user/list-user.component';

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
  @Input() set props(props: Record<string, any>) {
    if (this.componentRef) {
      this.updateComponentProps(props);
    }

    this._props = props;
  };

  private componentRef = null;
  private _props = null;

  constructor(private injector: Injector) {}
  ngOnInit(): void {
    loadRemoteModule({
      remoteEntry: this.remoteEntry,
      remoteName: this.remoteName,
      exposedModule: this.exposedModule,
    }).then(federated => {
      const componentRef = this.federatedComponent.createComponent(
        federated[this.exposedModule].exports.find(e => e.ɵcmp?.exportAs[0] === this.componentName),
        { injector: ɵcreateInjector(federated[this.exposedModule], this.injector) },
      );

      this.componentRef = componentRef;

      if (this._props) {
        this.updateComponentProps(this._props);
      }
    });
  }

  private updateComponentProps(props: Record<string, any>) {
    if (props && this.componentRef) {
      Object.entries(this._props).forEach(([key, value]) => {
        this.componentRef.setInput(key, value);
      });
    }
  }
}
