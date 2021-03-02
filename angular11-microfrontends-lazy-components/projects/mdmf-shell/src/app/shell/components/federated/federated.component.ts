import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { loadRemoteModule } from "../../../utils/federation-utils";

@Component({
  selector: "federated-component",
  templateUrl: "./federated.component.html",
  styleUrls: ["./federated.component.scss"],
})
export class FederatedComponent implements OnInit {
  @ViewChild('federatedComponent', { read: ViewContainerRef }) federatedComponent: ViewContainerRef;
  constructor(private injector: Injector, private cfr: ComponentFactoryResolver) { }
  ngOnInit(): void {
    loadRemoteModule({
      remoteEntry: "http://localhost:4201/remoteEntry.js",
      remoteName: "profile",
      exposedModule: "ProfileModule",
    }).then(profileListUserComponent => {
      const componentFactory = this.cfr.resolveComponentFactory(profileListUserComponent.ProfileModule.ɵmod.exports[0]);
      const { instance } = this.federatedComponent.createComponent(componentFactory, null, this.injector);
    });
  }
}
