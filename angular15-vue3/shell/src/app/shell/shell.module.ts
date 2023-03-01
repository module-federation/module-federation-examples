import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './shell-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FederatedComponent } from './components/federated/federated.component';

@NgModule({
  declarations: [HomeComponent, FederatedComponent],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ShellModule {}
