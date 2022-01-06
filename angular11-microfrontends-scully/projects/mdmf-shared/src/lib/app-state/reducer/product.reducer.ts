import { createReducer, on } from '@ngrx/store';
import { ProductActions } from 'projects/mdmf-shared/src/lib/app-state/actions';
import { Product } from '../models/product.model';

export const productFeatureKey = 'product';

export class ProductStateModel {
  products: Product[];
}

const initialState: ProductStateModel = {
  products: [],
};

export const reducer = createReducer(
  initialState,
  on(ProductActions.addProduct, (state, { product }) => ({
    products: [...state.products, product],
  })),
  on(ProductActions.removeProduct, (state, { product }) => ({
    products: state.products.filter(p => !(p.id === product.id)),
  })),
);

export const selectProducts = (state: ProductStateModel) => state.products;
