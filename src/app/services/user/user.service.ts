import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = environment.api_url;
  token: string | null = window.localStorage.getItem("token");
  header: HttpHeaders = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', `Bearer ${this.token}`);

  constructor(private http : HttpClient) { }

  Login(Email: string | null, Password: string | null) : Observable<Token> {
    return this.http.post<Token>(this.url + `Login?Email=${Email}&Password=${Password}`, null);
  }

  Register(newUser: User) : Observable<User>
  {
    return this.http.post<User>(this.url + "TbUsers/", newUser, { headers: this.header });
  }
}
