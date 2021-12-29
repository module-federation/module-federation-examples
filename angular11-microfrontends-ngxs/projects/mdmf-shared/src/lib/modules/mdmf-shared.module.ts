import { NgModule } from '@angular/core';
import { MdmfSharedComponent } from '../components/mdmf-shared.component';
import { CommonModule } from '@angular/common';

@NgModule({
  // declarations: [MdmfSharedComponent, ListUserComponent],
  declarations: [MdmfSharedComponent],
  imports: [CommonModule],
  // exports: [MdmfSharedComponent, ListUserComponent]
  exports: [MdmfSharedComponent],
})
export class MdmfSharedModule {}
