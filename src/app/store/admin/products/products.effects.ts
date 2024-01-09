import { AdminService } from './../../../core/services/admin/admin.service';
import { getProducts, gotProducts } from './categories.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, shareReplay } from 'rxjs';
import { AllProducts, ProductItem } from '../../../types';

@Injectable()
export class ProductsEffect {
  loadProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getProducts),
      exhaustMap((props) => {
        return this.adminService.getProducts(props.page).pipe(
          map((products: AllProducts) => {
            console.log('Products', products);
            
            return gotProducts({ products });
          }),
          shareReplay(1),
          catchError((err) => {
            return of()
          })
        );
      })
    );
  });

  constructor(private action$: Actions, private adminService: AdminService) {}
}