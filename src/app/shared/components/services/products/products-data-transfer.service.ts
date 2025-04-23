import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetAllProductsResponse } from 'src/app/models/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);

  public productsDatas: Array<GetAllProductsResponse> = [];

  setPoductsDatas(products: Array<GetAllProductsResponse>): void {
    if (products) {
      this.productsDataEmitter$.next(products);
      this.getProductsDatas();
    }
  }


  getProductsDatas(): GetAllProductsResponse[] {
    return this.productsDatas;
  }

  //código abaixo estava dando erro la no "products.home.components.ts"
  /* getProductsDatas() {
    this.productsDataEmitter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsDatas = response;
          }
        },
      });
      getProductsDatas(): GetAllProductsResponse[] {
        return this.productsDatas;
      }

  } */
}
