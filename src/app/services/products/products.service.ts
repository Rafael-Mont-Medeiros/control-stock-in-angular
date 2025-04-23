import { GetAllProductsResponse } from './../../models/products/response/GetAllProductsResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';
import { CreateProductsRequest } from 'src/app/models/products/requeste/createProductRequest';
import { CreateProductsResponse } from 'src/app/models/products/response/CreateProductsResponse';
import { DeleteProductResponse } from 'src/app/models/products/response/DeleteProductResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL = enviroment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      authorization: `Bearer ${this.JWT_TOKEN}`
    }),
  };



  constructor(
    private http: HttpClient, private cookie: CookieService) { }

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http
      .get<Array<GetAllProductsResponse>>(
        `${this.API_URL}/products`,
        this.httpOptions
      )
      .pipe(map((product) => product.filter((data) => data?.amount > 0)));
  };

  deleteProduct(product_id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(
      `${this.API_URL}/products/delete`,
      {
        ...this.httpOptions,
        params: {
          product_id: product_id,
        }
      }
    )
  }

  createProduct(requestDatas: CreateProductsRequest): Observable<CreateProductsResponse> {
    return this.http.post<CreateProductsResponse>(
      `${this.API_URL}/product`,
      requestDatas,
      this.httpOptions
    )
  };


}
