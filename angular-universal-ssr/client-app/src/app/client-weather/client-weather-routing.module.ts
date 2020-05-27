import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientWeatherHomeComponent } from "./client-weather-home/client-weather-home.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: ClientWeatherHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientWeatherRoutingModule {}
