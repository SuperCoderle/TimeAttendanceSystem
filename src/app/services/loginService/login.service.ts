import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Token } from 'src/app/models/token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient) { }

  //Declare Variables
  url: string = environment.api_url;
  refreshTokenTimeout: any;

  //Methods
  login(email: string, password: string) {
    return this.http.post<Token>(this.url + `Login?Email=${email}&Password=${password}`, null);
  }

  logout() {
    this.http.put<any>(this.url + `Login/RevokeToken/${this.getToken().refreshToken}`, null).subscribe();
    window.localStorage.clear();
    this.router.navigate(['']);
  }

  refreshToken() {
    console.log(this.getToken());
    return this.http.post<Token>(this.url + `Login/RefreshToken/`, this.getToken());
  }

  private storeJwtToken(token: string) {
    localStorage.setItem("token", token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken().token;
  }

  getToken(): any
  {
    return {
      token: localStorage.getItem('token')!,
      refreshToken: localStorage.getItem('refreshToken')!
    };
  }

  storeToken(token: Token) {
    localStorage.setItem("token", token.token);
    localStorage.setItem("refreshToken", token.refreshToken);
  }
}
