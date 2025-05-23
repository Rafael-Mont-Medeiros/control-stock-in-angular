import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';
import { GetCategoriesResponse } from 'src/app/models/categories/GetCategoriesResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = enviroment.API_URL
  private JWT_TOKEN = this.cookie.get('USER_TOKEN');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
  }

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAllCategories(): Observable<Array<GetCategoriesResponse>> {
    return this.http.get<Array<GetCategoriesResponse>>(
      `${this.API_URL}/categories`,
      this.httpOptions
    );
  }
}
