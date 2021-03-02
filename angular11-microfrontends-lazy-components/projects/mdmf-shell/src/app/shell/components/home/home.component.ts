import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { loadRemoteModule } from "../../../utils/federation-utils";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild('profileListUser', { read: ViewContainerRef }) profileListUser: ViewContainerRef;
  constructor(private injector: Injector, private cfr: ComponentFactoryResolver) { }
  ngOnInit(): void {
    loadRemoteModule({
      remoteEntry: "http://localhost:4201/remoteEntry.js",
      remoteName: "profile",
      exposedModule: "ProfileModule",
    }).then(profileListUserComponent => {
      const componentFactory = this.cfr.resolveComponentFactory(profileListUserComponent.ProfileModule.ɵmod.exports[0]);
      const { instance } = this.profileListUser.createComponent(componentFactory, null, this.injector);
    });
  }
}
