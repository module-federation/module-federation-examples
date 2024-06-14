import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './shell-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FederatedComponent } from './components/federated/federated.component';
import { MdmfSharedModule } from 'projects/mdmf-shared/src/lib/modules/mdmf-shared.module';
import { ListUserComponent } from './components/list-user/list-user.component';

@NgModule({
  declarations: [HomeComponent, FederatedComponent, ListUserComponent],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, ReactiveFormsModule, MdmfSharedModule],
})
export class ShellModule {}
