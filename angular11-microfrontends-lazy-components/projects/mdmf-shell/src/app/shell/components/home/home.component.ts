import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { loadRemoteModule } from "../../../utils/federation-utils";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild('profileListUser', {read: ViewContainerRef}) profileListUser: ViewContainerRef;
  constructor(private injector: Injector, private cfr: ComponentFactoryResolver) {}
  ngOnInit(): void {
    setTimeout(() => loadRemoteModule({
      // For Loading
      remoteEntry: "http://localhost:4201/remoteEntry.js",
      remoteName: "profile",
      exposedModule: "ProfileModule",
    }).then(profileListUserComponent => {
      console.log(profileListUserComponent)
      console.log(profileListUserComponent.ProfileModule.ɵmod.declarations[1])
      console.log(profileListUserComponent.ProfileModule.ɵmod.exports[0])
      const quizCardFactory = this.cfr.resolveComponentFactory(profileListUserComponent.ProfileModule.ɵmod.exports[0]);
      const {instance} = this.profileListUser.createComponent(quizCardFactory, null, this.injector);
    }));
  }
}
