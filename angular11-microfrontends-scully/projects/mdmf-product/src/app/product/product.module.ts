import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from './product.service';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [ProductComponent, ProductDetailComponent],
  imports: [CommonModule, HttpClientModule, ProductRoutingModule],
  providers: [ProductService],
})
export class ProductModule {}
