import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { Product } from 'projects/mdmf-shared/src/lib/app-state/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // This is an example of using TransferState for the products
  public readonly products$ = isScullyGenerated()
    ? this.transferState
        .getState<Product[]>('products')
        .pipe(tap(products => console.log('Getting TSS products', products)))
    : this.pruductService.getProducts().pipe(
        pluck('data'),
        tap(products => {
          console.log('Setting TSS products', products);
          this.transferState.setState('products', products);
        }),
      );

  // this is the simple solution to get the products without using TransferState
  /*
  public readonly products$: Observable<
    Product[]
  > = this.pruductService.getProducts().pipe(pluck("data"));
  */

  constructor(
    private readonly pruductService: ProductService,
    private readonly transferState: TransferStateService,
  ) {}

  ngOnInit(): void {}
}
