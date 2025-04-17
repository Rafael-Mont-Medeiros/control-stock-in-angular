import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { authResponse } from './../../models/user/auth/authResponse';
import { enviroment } from 'src/app/enviroments/enviroment';
import { authRequest } from 'src/app/models/user/auth/authRequest';
import { SignupRequest } from 'src/app/models/user/SignupRequest';
import { SignupResponse } from 'src/app/models/user/SingnupResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = enviroment.API_URL

  constructor(private http: HttpClient, private cookie: CookieService) { }

  //criação de usuário.
  signupUser(reqestDatas: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(
      `${this.API_URL}/user`, reqestDatas
    )
  }

  //autenticando o usuário
  authUser(requestDatas: authRequest): Observable<authResponse> {
    return this.http.post<authResponse>(
      `${this.API_URL}/auth`, requestDatas
    )
  }

  //verificando se o usuário tem um token/cookie
  isLoggedIn():boolean{
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }

}
