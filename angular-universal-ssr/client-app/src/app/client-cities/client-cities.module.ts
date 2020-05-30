import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClientCitiesHomeComponent } from "./client-cities-home/client-cities-home.component";
import { ClientCitiesRoutingModule } from "./client-cities-routing.module";

@NgModule({
  declarations: [ClientCitiesHomeComponent],
  imports: [CommonModule, ClientCitiesRoutingModule],
  exports: [ClientCitiesHomeComponent],
})
export class ClientCitiesModule {}
