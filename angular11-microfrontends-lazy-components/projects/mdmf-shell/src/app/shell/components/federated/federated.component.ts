import {
  Component,
  Input,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ɵcreateInjector,
} from "@angular/core";
import { loadRemoteModule } from "../../../utils/federation-utils";

@Component({
  selector: "federated-component",
  templateUrl: "./federated.component.html",
  styleUrls: ["./federated.component.scss"],
})
export class FederatedComponent implements OnInit {
  @ViewChild("federatedComponent", { read: ViewContainerRef })
  federatedComponent: ViewContainerRef;
  @Input() remoteEntry: string;
  @Input() remoteName: string;
  @Input() exposedModule: string;
  @Input() componentName: string;

  constructor(
    private injector: Injector,
    private cfr: ComponentFactoryResolver
  ) {}
  ngOnInit(): void {
    loadRemoteModule({
      remoteEntry: this.remoteEntry,
      remoteName: this.remoteName,
      exposedModule: this.exposedModule,
    }).then((federated) => {
      const componentFactory = this.cfr.resolveComponentFactory(
        federated[this.exposedModule].ɵmod.exports.find(
          (e) => e.name === this.componentName
        )
      );
      const { instance } = this.federatedComponent.createComponent(
        componentFactory,
        null,
        ɵcreateInjector(federated[this.exposedModule], this.injector)
      );
    });
  }
}
