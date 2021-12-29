import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'projects/mdmf-shared/src/lib/app-state/models/product.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ProductResponse {
  data: Product[];
}

@Injectable()
export class ProductService {
  constructor(private readonly httpClient: HttpClient) {}

  getProducts(): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`${environment.url}/assets/json/products.json`);
    // .pipe(delay(200)); // simulate real api with 200ms delay
    // thanks to https://fakestoreapi.com/ for the fake products
  }
}
