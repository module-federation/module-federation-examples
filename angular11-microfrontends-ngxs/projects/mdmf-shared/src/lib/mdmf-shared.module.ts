import { NgModule } from '@angular/core';
// import { ListUserComponent } from './components/list-user/list-user.component';
import { MdmfSharedComponent } from './mdmf-shared.component';
import { CommonModule } from '@angular/common';


@NgModule({
  // declarations: [MdmfSharedComponent, ListUserComponent],
  declarations: [MdmfSharedComponent],
  imports: [
    CommonModule
  ],
  // exports: [MdmfSharedComponent, ListUserComponent]
  exports: [MdmfSharedComponent]
})
export class MdmfSharedModule { }
