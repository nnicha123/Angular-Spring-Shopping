import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './products.action';
import * as fromReviewActions from '../review/review.action';
import { map, Observable, of, switchMap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductsEffect {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadProducts),
      switchMap(() => {
        return this.productsService
          .getProducts()
          .pipe(
            map((products: Product[]) =>
              fromActions.loadProductsSuccess({ products })
            )
          );
      })
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addProduct),
      switchMap(({ product }) => {
        return this.productsService
          .addProduct(product)
          .pipe(map(() => fromActions.addProductSuccess({ product })));
      })
    )
  );
}
